const productModel = require("../../models/productModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const allProductsCategory = asyncWrapper(async (req, res, next) => {
  const { category } = req?.body || req?.query
  const product = await productModel.find({ category })

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "all products category",
    data: product,
    code: StatusCodes.OK,
  })
})

module.exports = allProductsCategory