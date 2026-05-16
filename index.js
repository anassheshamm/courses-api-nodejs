const express = require('express');
const app = express();
const port = 4000;

const mongoose = require('mongoose');

app.use(express.json());

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/courseAPI")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));




// to parse the incoming request body as JSON, we need to use the express.json() middleware. This middleware is built into Express and allows us to easily handle JSON data sent in the request body.

// const { courses } = require('./data/courses');

const coursesRouter = require('./routes/courses');
// we use the app.use() method to mount the coursesRouter on the /api/courses path. This means that any requests to /api/courses will be handled by the coursesRouter, which is defined in the routes/courses.js file.
app.use('/api/courses', coursesRouter);


function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}
app.use(logger);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});  