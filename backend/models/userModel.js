const mongoose = require("mongoose")
const userRoles = require("../utils/userRoles")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    match: [/^[a-zA-Z|0-9._%+-]+@(gmail|hotmail|yahoo).com$/, 'Please provide a valid email address ending with @gmail or @hotmail']
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
    default: userRoles.USER
  },
  profilePic: String
}, {
  timestamps: true
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel