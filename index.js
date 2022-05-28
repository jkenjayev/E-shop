const express = require("express");
const mongoose = require("mongoose");
const hbs = require("./dependencies/engine-config");
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const app = express();
/* Routers */
const HomeRoute = require("./routes/home");
const ProductsRoute = require("./routes/products");
const CreateProductRoute = require("./routes/createProduct");
const AddCardRoute = require("./routes/AddCard");

const startProject = start();

/* App sets */
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

/* App uses */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/", HomeRoute);
app.use("/products", ProductsRoute);
app.use("/products/create", CreateProductRoute);
app.use("/card", AddCardRoute);

/* Database connection*/
async function start() {
  try {
    const url =
      "mongodb+srv://me:123@products.5hlkd.mongodb.net/E_Shop";
    await mongoose.connect(url, { useNewUrlParser: true }, () => {
      console.log("Connection is OK");
    });

    /* Listener */
    app.listen(5000, () => console.log(`Server has been running on port 5000`));
  } catch (e) {
    console.log(e);
  }
}
