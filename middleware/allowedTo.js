const httpStatusText = require("../utils/httpStatusText");

const allowedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return res.status(403).json({status: httpStatusText.FAIL, message: "Access denied. You do not have permission to perform this action."});
        }
        next();
    }


}

module.exports = allowedTo;