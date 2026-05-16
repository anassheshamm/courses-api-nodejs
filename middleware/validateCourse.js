const httpStatusText = require("../utils/httpStatusText");

const validateCourse = (req, res, next) => {
    const {title, price} = req.body;

    if (!title || !price) {
        return res.status(400).json({status: httpStatusText.FAIL, message: "Title and price are required"});
    }
    next();
};

module.exports = validateCourse;