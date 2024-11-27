const jwt = require("jsonwebtoken")
const asyncWrapper = require("./asyncWrapper");
const appError = require("../error/appError");
const httpStatusText = require("../utils/httpStatusText");

const verifyToken = asyncWrapper(async (req, res, next) => {
  const token = req.cookies?.token

  if (!token) {
    const error = appError.create(
      "Please Login...",
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }


  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch {
    const error = appError.create("invalid token", 401, httpStatusText.ERROR);
    return next(error);
  }
})


module.exports = verifyToken