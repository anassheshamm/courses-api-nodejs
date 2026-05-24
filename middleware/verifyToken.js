const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/appError");

const verifyToken = (req, res, next) => {
    try {
    const authHeader = req.headers["authorization"]; // Get the token from the Authorization header

    if (!authHeader) {
        return next(new AppError("Access denied. No token provided.", 401));    
    }

    const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" format
    if (!token) {
        return next(new AppError("Access denied. No token provided.", 401));
    }

    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token using the secret key

    req.currentUser = currentUser; // Attach the decoded user information to the request object

    next(); // Proceed to the next middleware or route handler

} catch (error) {
    return next(new AppError("Invalid token", 401));
}
}


module.exports = verifyToken;