const productModel = require("../../models/productModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const appError = require("../../error/appError");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");
const uploadProductPermission = require("../../helpers/permission");

const uploadProduct = asyncWrapper(async (req, res, next) => {
  // const uploadProduct = new productModel.create(req.body)
  // const saveProduct = await uploadProduct.save()

  const sessionUserId = req.user._id
  const uploadProduct = await productModel.create({ ...req.body, uploadedBy: sessionUserId })

  if (uploadProductPermission(sessionUserId)) {
    let error = appError.create(
      "Permission denied",
      StatusCodes.UNAUTHORIZED,
      httpStatusText.ERROR
    )
    return next(error)
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "Product Uploaded successfully",
    data: uploadProduct,
    code: StatusCodes.OK,
  })
})

module.exports = uploadProduct