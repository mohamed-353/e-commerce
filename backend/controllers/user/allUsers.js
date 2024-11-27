const userModel = require("../../models/userModel");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../middleware/asyncWrapper");
const httpStatusText = require("../../utils/httpStatusText");

const allUsers = asyncWrapper(async (req, res, next) => {
  const users = await userModel.find()

  return res.status(StatusCodes.OK).json({
    success: true,
    status: httpStatusText.SUCCESS,
    message: "All Users",
    data: users,
    code: StatusCodes.OK,
  })
})

module.exports = allUsers