const productModel = require("../../models/productModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const ProductDetails = asyncWrapper(async (req, res) => {
  const { productId } = req.body

  const product = await productModel.findById(productId)

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    data: product,
    message: "product details"
  })
})

module.exports = ProductDetails