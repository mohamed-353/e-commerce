const cartModel = require("../../models/addToCartModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const getQuantity = asyncWrapper(async (req, res, next) => {
  const userId = req.user._id
  const productsId = await cartModel.find({ userId }).lean();

  const quantity = productsId.map((ele) => ele.quantity);

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "quantity",
    data: quantity,
    code: StatusCodes.OK,
  });
})

module.exports = getQuantity