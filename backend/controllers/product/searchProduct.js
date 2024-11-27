const productModel = require("../../models/productModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const searchProduct = asyncWrapper(async (req, res, next) => {
  const query = req.query.q;
  const limit = 12;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const regex = new RegExp(query, "ig");
  const count = await productModel.countDocuments({ "$or": [{ productName: regex }, { category: regex }] })
  const product = await productModel.find({ "$or": [{ productName: regex }, { category: regex }] })
    .limit(limit)
    .skip(skip);

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "search product",
    data: { product, count },
    code: StatusCodes.OK,
    page: page,
  });
});

module.exports = searchProduct