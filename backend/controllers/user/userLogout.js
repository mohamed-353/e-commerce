const asyncWrapper = require("../../middleware/asyncWrapper")
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText")

const userLogout = asyncWrapper(async (req, res, next) => {
  return res
    .clearCookie("token", { httpOnly: true, sameSite: "none", secure: true })
    .status(StatusCodes.OK)
    .json({
      success: true,
      status: httpStatusText.SUCCESS,
      message: "Logged out successfully",
      code: StatusCodes.OK,
    });
});


module.exports = userLogout