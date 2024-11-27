const cartModel = require("../../models/addToCartModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const changeQuantity = asyncWrapper(async (req, res, next) => {
  const { quantity } = req.body;
  const userId = req.user._id;

  const productsId = await cartModel.find({ userId }).lean();

  const updateQuantity = await Promise.all(productsId.map((product, index) =>
    cartModel.updateOne({ _id: product._id }, { $set: { quantity: quantity[index] } })
  ));

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "User Cart Products",
    data: quantity,
    code: StatusCodes.OK,
  });
})

module.exports = changeQuantity