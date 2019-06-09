const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/api/users");
const products = require("./routes/api/products");
const orders = require("./routes/api/orders");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

//bodyparser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//passport middleware
app.use(passport.initialize());
//Passport Config Strategy
require("./config/passport")(passport);
//DB config URl
const dbURI =
  "mongodb+srv://root:root@cluster0-munsr.mongodb.net/OnStore?retryWrites=true";
//require("./config/keys").mongoURI;
//connection to mongodb
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB Connect"))
  .catch(err => console.log(err));

//Use Routes
app.use("/api/users", users);
app.use("/api/orders", orders);
app.use("/api/products", products);
//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //SET Static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirnam, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server Running on PORT " + port));
