const validateCourse = (req, res, next) => {
    const {title, price} = req.body;

    if (!title || !price) {
        return res.status(400).send("Title and price are required");
    }
    next();
};

module.exports = validateCourse;