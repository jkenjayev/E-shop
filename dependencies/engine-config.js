const expressHandlebars = require("express-handlebars");
const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");

const hbs = expressHandlebars.create({
  defaultLayout: "main",
  helpers: require("../utils/editHelper"),
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  extname: "hbs",
});

module.exports = hbs;
