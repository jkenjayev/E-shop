const Laptop = require("./Laptop");
const path = require("path");
const fs = require("fs");

const pathToDB = path.join(__dirname, "..", "data", "cart.json");

class Cart {
  static async add(laptop) {
    const cart = await Cart.fetch();
    const index = cart.laptops.findIndex(l => l.id === laptop.id);
    const candidate = cart.laptops[index];

    if(candidate) {
      candidate.count++;
      cart.laptops[index] = candidate;
    } else {
      laptop.count = 1;
      cart.laptops.push(laptop);
    }

    cart.price += +laptop.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDB, JSON.stringify(cart), (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToDB, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  static async remove(id) {
    const cart = await Cart.fetch();
    const index = cart.laptops.findIndex(l => l.id === id);
    const laptop = cart.laptops[index];

    if(laptop.count == 1) {
      cart.laptops = cart.laptops.filter(l => l.id !== id);
    } else {
      cart.laptops[index].count--;
    }

    cart.price -= laptop.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDB, JSON.stringify(cart), (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(cart);
        }
      });
    });
  }
}

module.exports = Cart;
