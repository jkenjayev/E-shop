const express = require("express");
const hbs = require("./dependencies/engine-config");
const app = express();
/* Routers */
const HomeRoute = require("./routes/home");
const ProductsRoute = require("./routes/products");
const CreateProductRoute = require("./routes/createProduct");

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
/* Listener */
app.listen(5000, () => console.log(`Server has been running on port 5000`));
