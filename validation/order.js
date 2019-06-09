const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  if (!Validator.isMobilePhone(data.phone, "en-PK"))
    errors.phone = "Phone no is Invalid";
  if (Validator.isEmpty(data.phone)) errors.phone = "Phone field is required";
  if (Validator.isEmpty(data.address))
    errors.address = "Address field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
