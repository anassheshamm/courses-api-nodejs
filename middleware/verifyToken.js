const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText");

const verifyToken = (req, res, next) => {
    try {
    const authHeader = req.headers["authorization"]; // Get the token from the Authorization header

    if (!authHeader) {
        return res.status(401).json({status: httpStatusText.FAIL, message: "Access denied. No token provided."});
    }

    const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" format
    if (!token) {
        return res.status(401).json({status: httpStatusText.FAIL, message: "Access denied. No token provided."});
    }

    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token using the secret key

    req.currentUser = currentUser; // Attach the decoded user information to the request object

    next(); // Proceed to the next middleware or route handler

} catch (error) {
    return res.status(401).json({status: httpStatusText.FAIL, message: "Access denied. Invalid token."});
}}

module.exports = verifyToken;