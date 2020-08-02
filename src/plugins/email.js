export default {
  install() {},
  validate(el, attribute) {
    return /^[_A-z0-9._%+-]+@[_A-z0-9.-]+\.[_A-z]{2,}$/.test(el.value);
  },
};
