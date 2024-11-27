const cartModel = require("../../models/addToCartModel");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../middleware/asyncWrapper");
const httpStatusText = require("../../utils/httpStatusText");

const addToCartCount = asyncWrapper(async (req, res, next) => {
  const userId = req.user._id;

  const count = await cartModel.countDocuments({ userId })

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "Count increment",
    data: { count },
    code: StatusCodes.OK,
  })
})

module.exports = addToCartCount