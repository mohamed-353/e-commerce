const productModel = require("../../models/productModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const productCategory = asyncWrapper(async (req, res, next) => {
  const categories = await productModel.distinct("category")
  const productByCategory = []

  for (const category of categories) {
    const product = await productModel.findOne({ category })
    if (product) {
      productByCategory.push(product)
    }
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "product category",
    data: productByCategory,
    code: StatusCodes.OK,
  })
})

module.exports = productCategory