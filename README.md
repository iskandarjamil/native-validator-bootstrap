![NPM](https://img.shields.io/npm/l/native-validator-bootstrap) ![npm](https://img.shields.io/npm/v/native-validator-bootstrap?label=version) ![npm bundle size](https://img.shields.io/bundlephobia/min/native-validator-bootstrap?label=size) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/native-validator-bootstrap?label=gzip)

# Native Validator Bootstrap

Native JavaScript Form Validator for Bootstrap 4, pure JavasSript solution without jQuery. Sample can be found [here](https://iskandarjamil.com/native-validator-bootstrap)

## Installation

Install via NPM:

```bash
npm install iskandarjamil/native-validator-bootstrap
```

## Usage

```js
import Validator from "native-validator-bootstrap";

new Validator("form");

// or

new Valudator("form", {
  // options
});
```

## Advance Usage

Feel free to add customization, can follow sample like below.
Add `data-pluginname` and `data-pluginname-error` for error message.

```html
<input type="text" data-numberonly data-numberonly-error="Accept number only." />
```

```js
import Validator from "native-validator-bootstrap";

Validator.plugin("numberonly", {
  // Optional if want to run something once the Validator created.
  install(el) {},
  // Required, return True/False
  validate(el, attribute) {
    return /^\d+$/.test(el.value);
  },
  // Optional Error message can be define here.
  error(el) {},
});

var validator = new Validator(document.querySelector("form"));
```

## Options

| Type            | Description                                            | Default  |
| --------------- | ------------------------------------------------------ | -------- |
| **showValid**   | Enable/Disable success input response                  | `True`   |
| **autoScroll**  | Enable/Disable auto scrolling to first error           | `True`   |
| **delay**       | Timer delay start checking validation after blur event | 500 (ms) |
| **offsetFocus** | Offset scrolling for autoScroll                        | 50 (ms)  |

## Plugin Included

| Type      | Description                                                 | Rules        |
| --------- | ----------------------------------------------------------- | ------------ |
| **match** | Check equal value between two input, example password match | `data-match` |
| **email** | Safe email validation                                       | `data-email` |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://github.com/iskandarjamil/native-validator-bootstrap/blob/master/LICENSE) license.
