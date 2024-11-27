const userModel = require("../../models/userModel");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../middleware/asyncWrapper");
const httpStatusText = require("../../utils/httpStatusText");
const appError = require("../../error/appError");

const updateUser = asyncWrapper(async (req, res, next) => {
  const { userId, email, name, role } = req.body

  if (req.body.oldRole === "MANAGER") {
    const error = appError.create(
      "Admin cant update manager",
      StatusCodes.UNAUTHORIZED,
      httpStatusText.FAIL
    )
    return next(error)
  }

  const payload = {
    ...(email && { email }),
    ...(name && { name }),
    ...(role && { role }),
  }

  const updateUser = await userModel.findByIdAndUpdate(userId, payload)

  return res.json({
    success: true,
    status: httpStatusText.SUCCESS,
    data: updateUser,
    message: "User Updated",
    code: StatusCodes.OK,
  })
})

module.exports = updateUser