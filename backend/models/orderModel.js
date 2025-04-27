const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  productDetails: {
    type: Array,
    default: [],
    require: true
  },
  email: {
    type: String,
    default: "",
    require: true
  },
  userId: {
    type: String,
    default: "",
    require: true
  },
  paymentDetails: {
    paymentId: {
      type: String,
      default: "",
      require: true
    },
    payment_method_type: [],
    payment_status: {
      type: String,
      default: "",
      require: true
    }
  },
  shipping_options: {},
  totalAmount: {
    type: Number,
    default: 0,
    require: true
  },
}, {
  timestamps: true
})

const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel