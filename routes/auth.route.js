const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.Controller");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const asyncWrapper = require("../middleware/asyncWrapper");
const { loginSchema,registerSchema,refreshTokenSchema} = require("../validators/auth.validator");
const validateSchema = require("../middleware/validateSchema");


router.route("/register")
    .post(validateSchema(registerSchema), asyncWrapper(userController.registerUser));

router.route("/login")
    .post(validateSchema(loginSchema), asyncWrapper(userController.loginUser));

router.route("/refresh-token")
    .post(validateSchema(refreshTokenSchema), asyncWrapper(userController.refreshTokenHandler));

router.route("/logout")
    .post(verifyToken, asyncWrapper(userController.logoutUser));

module.exports = router;