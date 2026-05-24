const User = require("../models/user.model");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");


// Get all users with pagination
const getAllUsers = async (req, res) => {
  const limit = parseInt(req.query.limit) || 2;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, "-__v -password").limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users } });
};

// Get user profile
const getUserProfile = async (req, res) => {
  const user = req.currentUser.id; // Get the current user information from the request object (set by verifyToken middleware)
  const userProfile = await User.findById(user, "-__v -password"); // Fetch the user profile from the database, excluding sensitive fields
  if (!userProfile) {
    throw new AppError("User not found", 404);
  }
  res.json({ status: httpStatusText.SUCCESS, data: { userProfile } }); // Send the user profile in the response
};




module.exports = {
  getAllUsers,
  getUserProfile,
};
