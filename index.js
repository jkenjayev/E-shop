const express = require("express");
const mongoose = require("mongoose");
const hbs = require("./dependencies/engine-config");
const app = express();
/* Routers */
const HomeRoute = require("./routes/home");
const ProductsRoute = require("./routes/products");
const CreateProductRoute = require("./routes/createProduct");
const AddCardRoute = require("./routes/AddCard");
const User = require("./models/User");

const startProject = start();

/* App sets */
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

/* Middleware */
app.use(async (req, res, next) => {
  try {
    const user = await User.findById("6291fdd0bd2d72090df316f5");
    req.user = user;
    next();
  } catch (err) {
    console.log(`Error with user authentication: `, err);
  }
});


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
    const url = "mongodb://localhost/products";
    await mongoose
      .connect(url, { useNewUrlParser: true })
      .then(() => console.log(`connection is OK`))
      .catch((err) => console.log(`Error on database connection: `, err));

    const candidate = await User.findOne();
    if (!candidate) {
      const userNew = new User({
        name: "John",
        email: "javohirwebdev@gmail.com",
        cart: { items: [] },
      });

      await userNew.save();
    }

    /* Listener */
    app.listen(5000, () => console.log(`Server has been running on port 5000`));
  } catch (e) {
    console.log(e);
  }
}
