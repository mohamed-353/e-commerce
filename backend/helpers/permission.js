const asyncWrapper = require("../middleware/asyncWrapper");
const userModel = require("../models/userModel");

const uploadProductPermission = asyncWrapper(async (userID) => {
  const user = await userModel.findById(userID)

  if (user.role !== "MANAGER" || user.role !== "ADMIN") {
    return false
  }
  return true
})

module.exports = uploadProductPermission