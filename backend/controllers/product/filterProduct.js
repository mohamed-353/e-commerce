const productModel = require("../../models/productModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const filterProduct = asyncWrapper(async (req, res, next) => {
  const categoryList = req?.body?.category || []

  const product = await productModel.find({
    category: {
      "$in": categoryList
    }
  })

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "filter product",
    data: product,
    code: StatusCodes.OK,
  });
});

module.exports = filterProduct