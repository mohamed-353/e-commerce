const jwt = require("jsonwebtoken")
const asyncWrapper = require("./asyncWrapper");
const appError = require("../error/appError");
const httpStatusText = require("../utils/httpStatusText");

const verifyToken = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader && !req.cookies?.token) {
    const error = appError.create(
      "token is required",
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }

  const token = req.cookies?.token || authHeader.split(" ")[1]

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