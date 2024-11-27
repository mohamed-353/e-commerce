const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const httpStatusText = require("../../utils/httpStatusText");
const appError = require("../../error/appError");
const asyncWrapper = require("../../middleware/asyncWrapper");
const userRoles = require("../../utils/userRoles");

const userSignUp = asyncWrapper(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const oldUser = await userModel.findOne({ email });

  if (oldUser) {
    const error = appError.create(
      "user Already exists", StatusCodes.UNAUTHORIZED, httpStatusText.FAIL
    );
    return next(error);
  };
  if (!name) {
    const error = appError.create(
      "provide name", StatusCodes.BAD_REQUEST, httpStatusText.FAIL
    )
    return next(error);
  };
  if (!email) {
    const error = appError.create(
      "provide email", StatusCodes.BAD_REQUEST, httpStatusText.FAIL
    )
    return next(error);
  };
  if (!password) {
    const error = appError.create(
      "provide password", StatusCodes.BAD_REQUEST, httpStatusText.FAIL
    )
    return next(error);
  };
  if (password !== confirmPassword) {
    const error = appError.create(
      "password is not same", StatusCodes.BAD_REQUEST, httpStatusText.FAIL
    )
    return next(error);
  };

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);


  if (!hashPassword) {
    const error = appError.create("password is wrong",
      StatusCodes.BAD_REQUEST,
      httpStatusText.FAIL,
    );
    return next(error)
  };

  const user = await userModel.find()

  const payload = {
    ...req.body,
    password: hashPassword,
  };

  if (!user) {
    payload.role = userRoles.MANAGER;
  } else {
    payload.role = userRoles.USER;
  }

  const userData = new userModel(payload);
  const saveUser = await userData.save();

  return res.status(StatusCodes.CREATED).json({
    success: true,
    status: httpStatusText.SUCCESS,
    data: { saveUser },
    message: "User created Successfully",
    code: StatusCodes.CONTINUE,
  });
});

module.exports = userSignUp;