const productModel = require("../../models/productModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const appError = require("../../error/appError");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");
const uploadProductPermission = require("../../helpers/permission");

const updateProduct = asyncWrapper(async (req, res, next) => {
  const sessionUserId = req.user._id;
  const { productId, data } = req.body; // Destructure the body correctly

  if (!uploadProductPermission(sessionUserId)) {
    appError.create(
      "Permission denied",
      StatusCodes.UNAUTHORIZED,
      httpStatusText.ERROR
    );
  }

  // Find the existing product
  const existingProduct = await productModel.findById(productId);
  if (!existingProduct) {
    appError.create("Product not found", StatusCodes.NOT_FOUND, httpStatusText.ERROR);
  }

  // Create an update object with non-empty values except for images
  const updateFields = {};
  Object.keys(data).forEach(key => {
    if (data[key] !== "" && data[key] !== undefined && key !== 'productImage') {
      updateFields[key] = data[key];
    }
  });

  // Handle images separately
  if (data.productImage.length != 0) {
    updateFields.productImage = data.productImage;
  }

  // Update the product using $set to update only the fields provided in updateFields
  const updatedProduct = await productModel.findByIdAndUpdate(
    productId,
    { $set: updateFields },
    { new: true, runValidators: true } // Return the updated document and run validators
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "Product updated successfully",
    data: updatedProduct,
    code: StatusCodes.OK,
  });
});

module.exports = updateProduct;
