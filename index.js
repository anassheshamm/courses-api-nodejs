require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const httpStatusText = require("./utils/httpStatusText");
const errorHandler = require('./middleware/errorHandler');
// to parse the incoming request body as JSON, we need to use the express.json() middleware. This middleware is built into Express and allows us to easily handle JSON data sent in the request body.
const coursesRouter = require('./routes/courses');
const usersRouter = require('./routes/users.route');
const authRouter = require('./routes/auth.route');

app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected");
    console.log(process.env.MONGODB_URI);
    // console.log(mongoose.connection.name);
})
.catch(err => console.log(err));

app.use(logger);

// we use the app.use() method to mount the coursesRouter on the /api/courses path. This means that any requests to /api/courses will be handled by the coursesRouter, which is defined in the routes/courses.js file.
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);


function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.use(errorHandler);


app.use((req, res) => {
    res.status(404).json({status: httpStatusText.ERROR, message: "Route not found"});
    // res.json("Route not found");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});  