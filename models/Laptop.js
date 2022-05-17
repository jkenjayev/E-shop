const uuid = require("uuid/dist/v4");
const fs = require("fs");
const path = require("path");

class Laptop {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid();
  }

  toJSON() {
    return JSON.stringify({
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id      
    })
  }

  save() {
    const laptops = await Laptop.getData();
    console.log("laptops this");
  }

  static getData() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "laptop.json"),
        "utf-8",
        (err, data) => {
          if (err) reject(err);
          resolve(JSON.parse(data));
        }
      );
    });
  }
}

module.exports = Laptop;