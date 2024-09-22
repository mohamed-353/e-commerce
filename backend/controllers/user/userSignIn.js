const userModel = require("../../models/userModel");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const asyncWrapper = require("../../middleware/asyncWrapper");
const generateJWT = require("../../utils/generateJWT");
const appError = require("../../error/appError");
const httpStatusText = require("../../utils/httpStatusText");

const userSignIn = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = appError.create(
      "Provide email and password",
      StatusCodes.BAD_REQUEST,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    const error = appError.create(
      "User not found",
      StatusCodes.UNAUTHORIZED,
      httpStatusText.FAIL
    );
    return next(error)
  };

  const checkPassword = await bcrypt.compare(password, user.password);

  if (checkPassword) {
    const tokenPayload = {
      email: user.email,
      _id: user._id,
      role: user.role
    };
    const token = await generateJWT(tokenPayload);

    const tokenOptions = {
      httpOnly: true,
      secure: true
    };

    res.cookie("token", token, tokenOptions).status(StatusCodes.OK).json({
      success: true,
      status: httpStatusText.SUCCESS,
      data: { token },
      message: "login Successfully",
      code: StatusCodes.OK,
    });
  } else {
    const error = appError.create(
      "pleas check the password",
      StatusCodes.UNAUTHORIZED,
      httpStatusText.ERROR
    );
    return next(error);
  };
}
)
module.exports = userSignIn;