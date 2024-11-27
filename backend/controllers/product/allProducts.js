const productModel = require("../../models/productModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const appError = require("../../error/appError");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const allProducts = asyncWrapper(async (req, res, next) => {
  const sessionUserId = req.user._id; // Get the user's ID from the session
  let products;
  if (req.user.role) {
    if (req.user.role === "MANAGER") {
      // Fetch all products for managers
      products = await productModel.find().sort({ createdAt: -1 });
    } else {
      // Fetch products uploaded by a specific user
      products = await productModel.find({ uploadedBy: sessionUserId }).sort({ createdAt: -1 });
    }
  } else {
    // Fetch products uploaded by a specific user
    products = await productModel.find({ uploadedBy: sessionUserId }).sort({ createdAt: -1 });
  }

  if (!products || products.length === 0) {
    return next(appError.create("No products found", StatusCodes.NO_CONTENT, httpStatusText.FAIL));
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "Products retrieved successfully",
    data: products,
    code: StatusCodes.OK,
  });
});

module.exports = allProducts;
