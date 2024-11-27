const cartModel = require("../../models/addToCartModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const deleteCartProduct = asyncWrapper(async (req, res, next) => {
  const userId = req.user._id
  const productId = req.body.productId

  await cartModel.findOneAndDelete({ userId, productId })

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "deleted cart product",
    code: StatusCodes.OK,
  })
})

module.exports = deleteCartProduct