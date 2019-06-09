const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Product = mongoose.model("products", productSchema);
