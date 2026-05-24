const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.Controller");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const asyncWrapper = require("../middleware/asyncWrapper");

router.route("/")
    .get(verifyToken,allowedTo("admin"), asyncWrapper(userController.getAllUsers));

router.route("/profile")
    .get(verifyToken, asyncWrapper(userController.getUserProfile));

router.route("/register")
    .post(asyncWrapper(userController.registerUser));

router.route("/login")
    .post(asyncWrapper(userController.loginUser));

router.route("/refresh-token")
    .post(asyncWrapper(userController.refreshTokenHandler));

router.route("/logout")
    .post(verifyToken, asyncWrapper(userController.logoutUser));

module.exports = router;
