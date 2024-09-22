const userModel = require("../../models/userModel");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../middleware/asyncWrapper");
const httpStatusText = require("../../utils/httpStatusText");

const userDetails = asyncWrapper(async (req, res, next) => {
  const user = await userModel.findById(req.user._id)

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "User Details",
    data: user,
    code: StatusCodes.OK,
  })
})

module.exports = userDetails