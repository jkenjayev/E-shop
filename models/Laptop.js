const { Schema, model } = require("mongoose");

const laptopSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

laptopSchema.method("toClient", function () {
  const laptop = this.toObject();
  laptop.id = laptop._id;
  delete laptop._id;
  
  return laptop;
})

module.exports = model("Laptop", laptopSchema);
