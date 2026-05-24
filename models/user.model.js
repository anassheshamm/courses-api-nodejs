const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true , validate: [validator.isEmail, "Invalid email"]},
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  refreshToken: { type: String , default: null } // Store refresh tokens for the user
});

const User = mongoose.model("User", userSchema);
module.exports = User;
