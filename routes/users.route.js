const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.Controller");

router.route("/")
    .get(userController.getAllUsers);

router.route("/register")
    .post(userController.registerUser);

router.route("/login")
    .post(userController.loginUser);

module.exports = router;
