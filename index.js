const express = require("express");
const mongoose = require("mongoose");
const hbs = require("./dependencies/engine-config");
const session = require("express-session");
const mongoStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const app = express();
const authMiddleware = require("./middlewares/authMiddleware");
const accessMiddleware = require("./middlewares/accessMiddleware");
const userMiddleware = require("./middlewares/userMiddleware");

/* Routers */
const HomeRoute = require("./routes/home");
const ProductsRoute = require("./routes/products");
const CreateProductRoute = require("./routes/createProduct");
const AddCardRoute = require("./routes/AddCard");
const User = require("./models/User");
const OrdersRouter = require("./routes/orders");
const authRoute = require("./routes/auth");
const url = "mongodb://localhost/products";

const store = new mongoStore({
  collection: "sessions",
  uri: url,
});

/* Start Project */
const startProject = start();

/* App sets */
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(
  session({
    secret: "secret dog",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(flash());
app.use(authMiddleware);
app.use(userMiddleware);

/* App uses */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/", HomeRoute);
app.use("/products", ProductsRoute);
app.use("/products/create", CreateProductRoute);
app.use("/card", AddCardRoute);
app.use("/orders", OrdersRouter);
app.use("/auth", authRoute);

/* Database connection*/
async function start() {
  try {
    await mongoose
      .connect(url, { useNewUrlParser: true })
      .then(() => console.log(`connection with DB is OK`))
      .catch((err) => console.log(`Error on database connection: `, err));

    /* Listener */
    app.listen(5000, () => console.log(`Server has been running on port 5000`));
  } catch (e) {
    console.log(e);
  }
}
