const productModel = require("../../models/productModel");
const cartModel = require("../../models/addToCartModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const cartProducts = asyncWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const productsId = await cartModel.find({ userId }).lean();

  const productIds = productsId.map((ele) => ele.productId);

  const userProducts = await productModel.find({ _id: { $in: productIds } }).lean();

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "User Cart Products",
    data: userProducts,
    code: StatusCodes.OK,
  });
})

module.exports = cartProducts;