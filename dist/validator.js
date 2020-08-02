/*!
 * native-validator-bootstrap v0.0.2
 * Copyright 2020 Iskandar Jamil <iskandar.jamil@yahoo.com>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Validator"] = factory();
	else
		root["Validator"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Validator = __webpack_require__(5)["default"];

Validator.plugin = Validator.prototype.plugin;
Validator.plugin("match", __webpack_require__(3)["default"]);
Validator.plugin("email", __webpack_require__(4)["default"]);
module.exports = Validator;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  install: function install() {},
  validate: function validate(el, attribute) {
    return el.value === document.querySelector(attribute).value;
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  install: function install() {},
  validate: function validate(el, attribute) {
    return /^[_A-z0-9._%+-]+@[_A-z0-9.-]+\.[_A-z]{2,}$/.test(el.value);
  }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ Validator_Validator; });

// EXTERNAL MODULE: ./node_modules/lodash.debounce/index.js
var lodash_debounce = __webpack_require__(0);
var lodash_debounce_default = /*#__PURE__*/__webpack_require__.n(lodash_debounce);

// CONCATENATED MODULE: ./src/common/getClosest.js
function getClosest(elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;

      while (--i >= 0 && matches.item(i) !== this) {}

      return i > -1;
    };
  } // Get closest match


  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }

  return null;
}
// CONCATENATED MODULE: ./src/Validator.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Validator_Validator = /*#__PURE__*/function () {
  function Validator(target, options) {
    _classCallCheck(this, Validator);

    this.$target = _typeof(target) === "object" ? target : document.querySelector(target);
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

    this.state = Object.assign({
      showValid: true,
      autoScroll: true,
      selectorElement: this.selectorElement,
      selector: this.selector,
      delay: this.delay,
      offsetFocus: this.offsetFocus
    }, this.options);
    this.installPlugin();

    if (!this.$target.hasValidator) {
      this.init();
      this.$target.hasValidator = this;
    } else {
      return this.$target.hasValidator;
    }

    return this;
  }

  _createClass(Validator, [{
    key: "init",
    value: function init() {
      this.attachFields();
      this.attachEvents();
    }
  }, {
    key: "plugin",
    value: function plugin(name, option) {
      if (typeof name === "undefined") {
        throw "Validator: Plugin must have a name.";
      }

      if (typeof option["validate"] !== "function") {
        throw "Validator: Plugin \"".concat(name, "\" must have validate method.");
      }

      this.prototype[this.prototype.getPluginName(name)] = option;
    }
  }, {
    key: "installPlugin",
    value: function installPlugin() {
      for (var key in this) {
        if (/plugin/.test(key) && key !== "plugin" && key !== "plugins") {
          this.plugins[this.getPluginParseName(key)] = this[key];

          if (typeof this[key]["install"] === "function") {
            this[key]["install"](this);
          }
        }
      }
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var _this = this;

      this.attachFields();
      this.$fields.forEach(function (el) {
        // el.removeEventListener("focus", this.handleFocus.bind(this));
        el.removeEventListener("blur", _this.handleBlur.bind(_this));
        el.removeEventListener("keyup", _this.handleKeyup.bind(_this));
        el.removeEventListener("change", _this.handleChange.bind(_this)); // el.addEventListener("focus", this.handleFocus.bind(this));

        el.addEventListener("blur", lodash_debounce_default()(_this.handleBlur.bind(_this), 150));
        el.addEventListener("keyup", _this.handleKeyup.bind(_this));
        el.addEventListener("change", _this.handleChange.bind(_this));
      });
    }
  }, {
    key: "completed",
    value: function completed() {
      var event = document.createEvent("Event");
      event.initEvent("completed", true, true);
      this.$target.dispatchEvent(event);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.$target.reset();
      this.$target.classList.remove("was-validated");
    }
  }, {
    key: "attachFields",
    value: function attachFields() {
      var _this2 = this;

      var elements = this.selectorElement.split(",");
      var selector = this.state.selector.split(":input")[1];
      this.$fields = [];

      for (var i = 0; i < elements.length; i++) {
        this.$target.querySelectorAll(elements[i].trim() + selector).forEach(function (el) {
          if (el.offsetParent !== null) {
            _this2.$fields.push(el);
          }
        });
      }

      this.$target.setAttribute("novalidate", true);
    }
  }, {
    key: "attachEvents",
    value: function attachEvents() {
      var _this3 = this;

      this.$target.addEventListener("reset", this.handleFormReset.bind(this));
      this.$target.addEventListener("submit", this.handleFormSubmit.bind(this));
      this.$target.addEventListener("change", this.handleFormChange.bind(this));
      this.$target.addEventListener("refresh", this.refresh.bind(this));
      this.$fields.forEach(function (el) {
        // el.addEventListener("focus", this.handleFocus.bind(this));
        el.addEventListener("blur", lodash_debounce_default()(_this3.handleBlur.bind(_this3), 150));
        el.addEventListener("keyup", _this3.handleKeyup.bind(_this3));
        el.addEventListener("change", _this3.handleChange.bind(_this3));
      });
    }
  }, {
    key: "handleFormReset",
    value: function handleFormReset(e) {
      var _this4 = this;

      this.$fields.forEach(function (el) {
        _this4.clearError(el);
      });
    }
  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(e) {
      this.runAllValidation();

      if (this.state.showValid) {
        this.$target.classList.add("was-validated");
      }

      if (this.hasError()) {
        e.preventDefault();
        this.setSubmitDisabled();
        this.focusFirstError();
        return false;
      }

      this.completed();

      if (typeof this.$target.dataset.disableSubmit !== "undefined") {
        e.preventDefault();
        return false;
      }
    }
  }, {
    key: "handleFormChange",
    value: function handleFormChange(e) {
      if (this.hasError()) {
        this.setSubmitDisabled();
      } else {
        this.setSubmitEnabled();
      }
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(e) {
      clearTimeout(this.timerTyping);
      clearTimeout(this.timerChange);
      this.clearError(e.target);
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(e) {
      clearTimeout(this.timerTyping);
      clearTimeout(this.timerChange);
      this.validateEach(e.target);
    }
  }, {
    key: "handleKeyup",
    value: function handleKeyup(e) {
      var _this5 = this;

      clearTimeout(this.timerTyping);
      this.timerTyping = setTimeout(function () {
        _this5.validateEach(e.target);
      }, this.delay);
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var _this6 = this;

      clearTimeout(this.timerChange);
      this.timerChange = setTimeout(function () {
        _this6.validateEach(e.target);
      }, this.delay);
    }
  }, {
    key: "runAllValidation",
    value: function runAllValidation() {
      var _this7 = this;

      this.$fields.forEach(function (el) {
        _this7.validateEach(el);
      });
    }
  }, {
    key: "validateEach",
    value: function validateEach(el) {
      if (el.checkValidity) {
        if (!el.checkValidity() && !el.validity.valid) {
          this.setError(el);
        } else {
          this.clearError(el);
        }
      }

      for (var key in this.plugins) {
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
            } else {
              el.setCustomValidity("");
              this.clearError(el);
            }
          }
        }
      }
    }
  }, {
    key: "hasError",
    value: function hasError() {
      return this.getErrors().length > 0;
    }
  }, {
    key: "hasInvalid",
    value: function hasInvalid(el) {
      return el.checkValidity && !el.checkValidity() && !el.validity.valid;
    }
  }, {
    key: "setError",
    value: function setError(el) {
      var $parent = getClosest(el, ".form-group");
      el.classList.add("is-invalid");
      el.classList.remove("is-valid");

      if ($parent) {
        $parent.classList.remove("is-valid");
        $parent.classList.add("is-invalid");
      }

      this.displayError(el);
    }
  }, {
    key: "clearError",
    value: function clearError(el) {
      var $parent = getClosest(el, ".form-group");
      el.classList.remove("is-invalid");

      if (this.state.showValid) {
        el.classList.add("is-valid");
      }

      if ($parent) {
        $parent.classList.remove("is-invalid");
        $parent.classList.add("is-valid");

        if ($parent.querySelector(".invalid-feedback")) {
          $parent.querySelector(".invalid-feedback").textContent = "";
        }
      }
    }
  }, {
    key: "displayError",
    value: function displayError(el) {
      var $parent = getClosest(el, ".form-group");
      var errorMessage;

      if ($parent) {
        errorMessage = this.getErrorMessage(el);

        if ($parent.querySelector(".invalid-feedback")) {
          $parent.querySelector(".invalid-feedback").textContent = errorMessage;
        }
      }
    }
  }, {
    key: "setSubmitDisabled",
    value: function setSubmitDisabled() {
      if (this.$submitBtn) {
        this.$submitBtn.classList.add("disabled");
      }
    }
  }, {
    key: "setSubmitEnabled",
    value: function setSubmitEnabled() {
      if (this.$submitBtn) {
        this.$submitBtn.classList.remove("disabled");
        this.$submitBtn.removeAttribute("disabled");
      }
    }
  }, {
    key: "focusFirstError",
    value: function focusFirstError() {
      var _this8 = this;

      var $parent;
      var el = this.getErrors();
      var items = [];

      if (this.isFocusing) {
        return;
      }

      if (el.length < 1) {
        return;
      }

      el = el[0];
      $parent = getClosest(el, ".form-group");

      if ($parent) {
        if ($parent.querySelector("input")) {
          $parent.querySelector("input").focus();
        }

        if ($parent.querySelector("select")) {
          $parent.querySelector("select").focus();
        }

        if ($parent.querySelector("textarea")) {
          $parent.querySelector("textarea").focus();
        }

        if (this.state.autoScroll) {
          this.isFocusing = true;
          window.scrollTo({
            top: Math.round($parent.getBoundingClientRect().top) + Math.round(window.scrollY) + -this.state.offsetFocus,
            behavior: "smooth"
          });
          setTimeout(function () {
            _this8.isFocusing = false;
          }, 500);
        }
      }
    }
  }, {
    key: "getErrors",
    value: function getErrors() {
      var el = this.$target.querySelectorAll(":invalid");
      var items = [];
      el.forEach(function (item) {
        if (!!(item.offsetWidth || item.offsetHeight || item.getClientRects().length)) {
          items.push(item);
        }
      });
      return items;
    }
  }, {
    key: "getErrorMessage",
    value: function getErrorMessage(el) {
      return el.dataset["error"] || el.validationMessage || "Please fill out this field.";
    }
  }, {
    key: "getPluginErrorMessage",
    value: function getPluginErrorMessage(el, name) {
      return el.dataset[name + "Error"] || el.dataset["error"] || "Please fill out this field.";
    }
  }, {
    key: "getPluginName",
    value: function getPluginName(name) {
      return "plugin" + name[0].toUpperCase() + name.slice(1).toLowerCase();
    }
  }, {
    key: "getPluginParseName",
    value: function getPluginParseName(name) {
      return name.replace("plugin", "").toLowerCase();
    }
  }]);

  return Validator;
}();



/***/ })
/******/ ]);
});
//# sourceMappingURL=validator.js.map