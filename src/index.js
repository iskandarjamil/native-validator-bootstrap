const Validator = require("./Validator").default;

Validator.plugin = Validator.prototype.plugin;
Validator.plugin("match", require("./plugins/match").default);
Validator.plugin("email", require("./plugins/email").default);

module.exports = Validator;
