const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  brandName: {
    type: String,
  },
  category: {
    type: String,
  },
  productImage: {
    type: [],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  sellingPrice: {
    type: Number,
  },
  uploadedBy: {
    type: String,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
})

const productModel = mongoose.model("Product", productSchema)

module.exports = productModel