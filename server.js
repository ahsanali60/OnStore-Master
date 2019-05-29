const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const products = require("./routes/api/products");
const orders = require("./routes/api/orders");

const app = express();

//DB config URl
const dbURI = require("./config/keys").mongoURI;
//connection to mongodb
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB Connect"))
  .catch(err => console.log(err));

//Use Routes
app.use("/api/users", users);
app.use("/api/orders", orders);
app.use("/api/products", products);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server Running on PORT " + port));
