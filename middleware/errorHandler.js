const errorHandler = (err, req, res, next) => {

    // Mongoose Validation Error
    if (err.name === "ValidationError") {

        const errors = Object.values(err.errors)
            .map(val => val.message);

        err.statusCode = 400;

        err.message = errors;
    }


    err.statusCode = err.statusCode || 500;

    err.message = err.message || "Internal Server Error";

    res.status(err.statusCode).json({

        status: err.statusCode >= 500 ? "error" : "fail",

        message: err.message

    });

};

module.exports = errorHandler;