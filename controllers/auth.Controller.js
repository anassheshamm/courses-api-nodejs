const User = require("../models/user.model");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");



// Register a new user
const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  const existingUser = await User.findOne({email});
  if (existingUser) {
      throw new AppError("Email already exists", 400);
  }

  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    role,
  });

  await user.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { user } });
};

// Login user and generate JWT token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 400);
  }

  // Generate JWT token
  const accessToken = jwt.sign(
    {
      id: user._id,

      email: user.email,

      role: user.role,
    },

    process.env.JWT_SECRET_KEY,

    { expiresIn: "10m" },
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },

    process.env.JWT_REFRESH_SECRET_KEY,

    { expiresIn: "7d" },
  );
  user.refreshToken = refreshToken; // Store the refresh token in the user's document
  await user.save({ validateBeforeSave: false }); // Save the user document without running validation (since we are only updating the refresh token)

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Login successful",
    data: {
      accessToken,
      refreshToken,
    },
  });
};


// Refresh token handler
const refreshTokenHandler = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError("Refresh token is required", 401);
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.refreshToken !== refreshToken) {

    throw new AppError("Invalid refresh token", 403);
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "10m" },
  );

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      accessToken,
    },
  });
};


const logoutUser = async (req, res) => {
    const user = await User.findById(req.currentUser.id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    user.refreshToken = null; // Clear the refresh token from the user's document
    await user.save({ validateBeforeSave: false }); // Save the user document without running validation

    res.status(200).json({ status: httpStatusText.SUCCESS, message: "Logout successful" });

}

module.exports = {
  registerUser,
  loginUser,
  refreshTokenHandler,
  logoutUser
};