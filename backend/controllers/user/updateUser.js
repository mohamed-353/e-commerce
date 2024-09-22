const userModel = require("../../models/userModel");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../middleware/asyncWrapper");
const httpStatusText = require("../../utils/httpStatusText");

const updateUser = asyncWrapper(async (req, res) => {
  const { userId, email, name, role } = req.body

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