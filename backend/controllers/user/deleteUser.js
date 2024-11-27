const userModel = require("../../models/userModel");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");

const deleteUser = asyncWrapper(async (req, res, next) => {
  const deleteUser = await userModel.findByIdAndDelete(req.body.userId)

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "user deleted",
    data: deleteUser,
    code: StatusCodes.OK,
  })
})

module.exports = deleteUser