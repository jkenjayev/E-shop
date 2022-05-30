const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },

        laptopId: {
          type: Schema.Types.ObjectId,
          ref: "Laptop",
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (laptop) {
  let items = [...this.cart.items];
  const indexOfLaptop = items.findIndex((l) => {
    return l.laptopId.toString() === laptop._id.toString();
  });

  if (indexOfLaptop > 0) {
    items[indexOfLaptop].count = items[indexOfLaptop].count + 1;
  } else {
    items.push({
      laptopId: laptop._id,
      count: 1,
    });
  }
  this.cart = { items };

  return this.save();
};

module.exports = model("User", userSchema);
