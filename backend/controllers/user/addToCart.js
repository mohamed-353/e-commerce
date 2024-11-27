const cartModel = require("../../models/addToCartModel")
const asyncWrapper = require("../../middleware/asyncWrapper")
const appError = require("../../error/appError")
const httpStatusText = require("../../utils/httpStatusText");
const { StatusCodes } = require("http-status-codes");

const addToCart = asyncWrapper(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const isProductAvailable = await cartModel.findOne({ productId, userId });

  if (isProductAvailable) {
    const error = appError.create(
      "Product Already Exist",
      StatusCodes.UNAUTHORIZED,
      httpStatusText.FAIL
    )
    return next(error)
  }

  const payload = {
    productId,
    quantity,
    userId,
  };

  const addProductToCart = new cartModel(payload);
  const saveProduct = await addProductToCart.save();

  return res.json({
    success: true,
    message: "Product Added To Cart",
    data: saveProduct,
  });

})

module.exports = addToCart;
