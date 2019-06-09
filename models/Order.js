const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const productSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products"
      }
    }
  ],
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  bill: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Order = mongoose.model("orders", productSchema);
