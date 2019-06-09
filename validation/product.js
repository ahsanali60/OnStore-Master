const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProductInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";

  if (!Validator.isLength(data.name, { min: 10, max: 20 }))
    errors.name = "Name must be between 10 and 20 characters";
  if (Validator.isEmpty(data.name)) errors.name = "Name field is required";

  if (!Validator.isLength(data.description, { min: 10, max: 200 }))
    errors.description = "Description must be between 10 and 200 characters";
  if (Validator.isEmpty(data.description))
    errors.description = "Description field is required";

  if (data.price < 0) errors.price = "Price cannot be negative";
  if (Validator.isEmpty(data.price)) errors.price = "Price field is required";

  if (data.quantity < 0) errors.quantity = "Quantity cannot be negative";
  if (Validator.isEmpty(data.quantity))
    errors.quantity = "Quantity field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
