export default {
  install() {},
  validate(el, attribute) {
    return el.value === document.querySelector(attribute).value;
  },
};
