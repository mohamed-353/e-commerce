const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: String,
    require: true,
    ref: "product"
  },
  quantity: {
    type: Number,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
}, {
  timestamps: true,
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
