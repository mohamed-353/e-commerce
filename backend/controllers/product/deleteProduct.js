const productModel = require("../../models/productModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const deleteProduct = await productModel.findByIdAndDelete(req.body.productId)

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "product deleted",
    data: deleteProduct,
    code: StatusCodes.OK,
  })
})

module.exports = deleteProduct