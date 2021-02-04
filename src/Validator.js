import debounce from "lodash.debounce";
import { getClosest } from "./common/getClosest";

export default class Validator {
  constructor(target, options) {
    this.$target = typeof target === "object" ? target : document.querySelector(target);
    this.$submitBtn = this.$target ? this.$target.querySelector('[type="submit"]') : null;
    this.$resetBtn = this.$target ? this.$target.querySelector('[type="reset"]') : null;
    this.$fields = [];
    this.options = options || {};
    this.plugins = {};
    this.selectorElement = "input, select, textarea";
    this.selector = ':input:not([type="hidden"]):not([type="submit"]):not([type="reset"]):not(button)';
    this.isValid = false;
    this.delay = 500;
    this.offsetFocus = 50;
    this.timerChange;
    this.timerTyping;
    this.isFocusing;
    this.callback;

    if (!this.$target) {
      return;
    }

    this.state = Object.assign(
      {
        showValid: true,
        autoScroll: true,
        selectorElement: this.selectorElement,
        selector: this.selector,
        delay: this.delay,
        offsetFocus: this.offsetFocus,
      },
      this.options,
    );

    this.installPlugin();

    if (!this.$target.hasValidator) {
      this.init();
      this.$target.hasValidator = this;
    } else {
      return this.$target.hasValidator;
    }

    return this;
  }

  init() {
    this.attachFields();
    this.attachEvents();
  }

  plugin(name, option) {
    if (typeof name === "undefined") {
      throw `Validator: Plugin must have a name.`;
    }
    if (typeof option["validate"] !== "function") {
      throw `Validator: Plugin "${name}" must have validate method.`;
    }

    this.prototype[this.prototype.getPluginName(name)] = option;
  }

  installPlugin() {
    for (var key in this) {
      if (/plugin/.test(key) && key !== "plugin" && key !== "plugins") {
        this.plugins[this.getPluginParseName(key)] = this[key];

        if (typeof this[key]["install"] === "function") {
          this[key]["install"](this);
        }
      }
    }
  }

  refresh() {
    this.attachFields();

    this.$fields.forEach((el) => {
      // el.removeEventListener("focus", this.handleFocus.bind(this));
      el.removeEventListener("blur", this.handleBlur.bind(this));
      el.removeEventListener("keyup", this.handleKeyup.bind(this));
      el.removeEventListener("change", this.handleChange.bind(this));

      // el.addEventListener("focus", this.handleFocus.bind(this));
      el.addEventListener("blur", debounce(this.handleBlur.bind(this), 150));
      el.addEventListener("keyup", this.handleKeyup.bind(this));
      el.addEventListener("change", this.handleChange.bind(this));
    });
  }

  completed() {
    let event = document.createEvent("Event");
    event.initEvent("completed", true, true);

    this.$target.dispatchEvent(event);
  }

  clear() {
    this.$target.reset();
    this.$target.classList.remove("was-validated");
  }

  attachFields() {
    let elements = this.selectorElement.split(",");
    let selector = this.state.selector.split(":input")[1];

    this.$fields = [];
    for (let i = 0; i < elements.length; i++) {
      this.$target.querySelectorAll(elements[i].trim() + selector).forEach((el) => {
        if (el.offsetParent !== null) {
          this.$fields.push(el);
        }
      });
    }

    this.$target.setAttribute("novalidate", true);
  }
  attachEvents() {
    this.$target.addEventListener("reset", this.handleFormReset.bind(this));
    this.$target.addEventListener("submit", this.handleFormSubmit.bind(this));
    this.$target.addEventListener("change", this.handleFormChange.bind(this));
    this.$target.addEventListener("refresh", this.refresh.bind(this));

    this.$fields.forEach((el) => {
      // el.addEventListener("focus", this.handleFocus.bind(this));
      el.addEventListener("blur", debounce(this.handleBlur.bind(this), 150));
      el.addEventListener("keyup", this.handleKeyup.bind(this));
      el.addEventListener("change", this.handleChange.bind(this));
    });
  }

  handleFormReset(e) {
    this.$fields.forEach((el) => {
      this.clearError(el);
    });
  }
  handleFormSubmit(e) {
    this.runAllValidation();

    if (this.state.showValid) {
      this.$target.classList.add("was-validated");
    }

    if (this.hasError()) {
      e.preventDefault();
      this.setSubmitDisabled();

      setTimeout(() => {
        this.focusFirstError();
      }, 500);

      return false;
    }

    this.completed();

    if (typeof this.$target.dataset.disableSubmit !== "undefined") {
      e.preventDefault();
      return false;
    }
  }
  handleFormChange(e) {
    if (this.hasError()) {
      this.setSubmitDisabled();
    } else {
      this.setSubmitEnabled();
    }
  }
  handleFocus(e) {
    clearTimeout(this.timerTyping);
    clearTimeout(this.timerChange);
    this.clearError(e.target);
  }
  handleBlur(e) {
    clearTimeout(this.timerTyping);
    clearTimeout(this.timerChange);
    this.validateEach(e.target);
  }
  handleKeyup(e) {
    const target = e.target;
    clearTimeout(this.timerTyping);
    this.timerTyping = setTimeout(() => {
      this.validateEach(target);
    }, this.delay);
  }
  handleChange(e) {
    const target = e.target;
    clearTimeout(this.timerChange);
    this.timerChange = setTimeout(() => {
      this.validateEach(target);
    }, this.delay);
  }

  runAllValidation() {
    this.$fields.forEach((el) => {
      this.validateEach(el);
    });
  }
  validateEach(el) {
    let hasDefaultError = false;

    if (el.checkValidity) {
      if (!el.checkValidity()) {
        for (var key in el.validity) {
          if (key === "customError") {
            continue;
          }
          if (el.validity[key] === true) {
            this.setError(el);
            hasDefaultError = true;
          }
        }
      }
    }

    if (hasDefaultError) {
      return;
    } else {
      this.clearError(el);
    }

    for (let key in this.plugins) {
      if (this.plugins.hasOwnProperty(key)) {
        if (el.hasAttribute("data-" + key)) {
          if (!this.plugins[key].validate(el, el.getAttribute("data-" + key))) {
            if (typeof this.plugins[key]["error"] === "function") {
              el.setCustomValidity(this.plugins[key]["error"](el));
            } else if (typeof this.plugins[key]["error"] !== "undefined") {
              el.setCustomValidity(this.plugins[key]["error"]);
            } else {
              el.setCustomValidity(this.getPluginErrorMessage(el, key));
            }
            this.setError(el);
            return;
          } else {
            el.setCustomValidity("");
            this.clearError(el);
          }
        }
      }
    }

    this.clearError(el);
  }

  hasError() {
    return this.getErrors().length > 0;
  }
  hasInvalid(el) {
    return el.checkValidity && !el.checkValidity() && !el.validity.valid;
  }
  setError(el) {
    let $parent = getClosest(el, ".form-group");
    let $siblings = this.getSiblings($parent);

    el.classList.add("is-invalid");
    el.classList.remove("is-valid");

    if ($siblings.length > 1) {
      for (let index = 0; index < $siblings.length; index++) {
        $siblings[index].classList.add("is-invalid");
        $siblings[index].classList.remove("is-valid");
      }
    } else {
      el.classList.add("is-invalid");
      el.classList.remove("is-valid");
    }

    if ($parent) {
      $parent.classList.remove("is-valid");
      $parent.classList.add("is-invalid");
    }
    this.displayError(el);
  }
  clearError(el) {
    let $parent = getClosest(el, ".form-group");
    let $siblings = this.getSiblings($parent);

    if ($siblings.length > 1) {
      for (let index = 0; index < $siblings.length; index++) {
        $siblings[index].classList.remove("is-invalid");

        if (this.state.showValid) {
          $siblings[index].classList.add("is-valid");
        }
      }
    } else {
      el.classList.remove("is-invalid");

      if (this.state.showValid) {
        el.classList.add("is-valid");
      }
    }

    if ($parent) {
      $parent.classList.remove("is-invalid");

      if (this.state.showValid) {
        $parent.classList.add("is-valid");
      }

      if ($parent.querySelector(".invalid-feedback")) {
        $parent.querySelector(".invalid-feedback").textContent = "";
      }
    }
  }
  displayError(el) {
    let $parent = getClosest(el, ".form-group");
    let errorMessage;

    if ($parent) {
      errorMessage = this.getErrorMessage(el);

      if ($parent.querySelector(".invalid-feedback")) {
        $parent.querySelector(".invalid-feedback").textContent = errorMessage;
      }
    }
  }
  setSubmitDisabled() {
    if (this.$submitBtn) {
      this.$submitBtn.classList.add("disabled");
    }
  }
  setSubmitEnabled() {
    if (this.$submitBtn) {
      this.$submitBtn.classList.remove("disabled");
      this.$submitBtn.removeAttribute("disabled");
    }
  }
  focusFirstError() {
    let $parent;
    let el = this.getErrors();

    if (this.isFocusing) {
      return;
    }

    if (el.length < 1) {
      return;
    }
    el = el[0];

    $parent = getClosest(el, ".form-group");
    if ($parent) {
      setTimeout(() => {
        if ($parent.querySelector("input")) {
          $parent.querySelector("input").focus();
        }
        if ($parent.querySelector("select")) {
          $parent.querySelector("select").focus();
        }
        if ($parent.querySelector("textarea")) {
          $parent.querySelector("textarea").focus();
        }
      }, this.delay);

      if (this.state.autoScroll) {
        this.isFocusing = true;

        window.scrollTo({
          top: Math.round($parent.getBoundingClientRect().top) + Math.round(window.scrollY) + -this.state.offsetFocus,
          behavior: "smooth",
        });
        setTimeout(() => {
          this.isFocusing = false;
        }, 500);
      }
    }
  }

  getSiblings(target) {
    let elements = this.selectorElement.split(",");
    let selector = this.state.selector.split(":input")[1];
    let $items = [];

    for (let i = 0; i < elements.length; i++) {
      target.querySelectorAll(elements[i].trim() + selector).forEach((el) => {
        if (el.offsetParent !== null) {
          $items.push(el);
        }
      });
    }

    return $items;
  }
  getErrors() {
    let el = this.$target.querySelectorAll(":invalid");
    let items = [];

    el.forEach((item) => {
      if (!!(item.offsetWidth || item.offsetHeight || item.getClientRects().length)) {
        items.push(item);
      }
    });

    return items;
  }
  getErrorMessage(el) {
    if (el.validity.customError === true) {
      return el.validationMessage || el.dataset["error"] || "Please fill out this field.";
    }
    return el.dataset["error"] || el.validationMessage || "Please fill out this field.";
  }
  getPluginErrorMessage(el, name) {
    return el.dataset[name + "Error"] || el.dataset["error"] || "Please fill out this field.";
  }
  getPluginName(name) {
    return "plugin" + name[0].toUpperCase() + name.slice(1).toLowerCase();
  }
  getPluginParseName(name) {
    return name.replace("plugin", "").toLowerCase();
  }
}
