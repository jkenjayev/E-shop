const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

class Laptop {
  constructor(title, price, description, img) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.img = img;
    this.id = uuidv4();
  }

  jsonDataToString() {
    return {
      title: this.title,
      price: this.price,
      description: this.description,
      img: this.img,
      id: this.id,
    };
  }

  async save() {
    const laptops = await Laptop.getAllData();
    laptops.push(this.jsonDataToString());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "laptop.json"),
        JSON.stringify(laptops),
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  static getAllData() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "laptop.json"),
        "utf-8",
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
        }
      );
    });
  }

  static async getLaptopById(id) {
    const laptop = await Laptop.getAllData();
    return laptop.find(l => l.id === id);
  }

  static async update(laptop) {
    const laptops = await Laptop.getAllData();
    const index = laptops.findIndex(l => l.id === laptop.id) ;
    laptops[index] = laptop;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "laptop.json"),
        JSON.stringify(laptops),
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
}

module.exports = Laptop;
