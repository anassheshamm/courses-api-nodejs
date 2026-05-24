const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/appError");

const allowedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return next(new AppError("Access denied. You do not have permission to perform this action.", 403));
        }
        next();
    }


}

module.exports = allowedTo;