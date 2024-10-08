const appError = require("../error/appError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(appError.create("this role not authorized", 401))
    }
    next();
  };
}