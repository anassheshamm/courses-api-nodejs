const Course = require("../models/course");
const httpStatusText = require("../utils/httpStatusText");

//get all courses
const getAllCourses = async (req, res) => {

    const limit = parseInt(req.query.limit) || 2;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    console.log(req.query);
    
    const courses = await Course.find({}, "-__v").limit(limit).skip(skip);
    res.json({status: httpStatusText.SUCCESS, data: {courses}});
};

//get course by id
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseid, "-__v");
        if (!course) {
            res.status(404).json({status: httpStatusText.FAIL, message: "Course not found"});
        } else {
            res.json({status: httpStatusText.SUCCESS, data: {course}});
        }
    } catch (error) {
        res.status(400).json({status: httpStatusText.ERROR, message: error.message, code:400});
    }
};

//create a new course
const createCourse = async (req, res) => {

    const course = new Course({
        title: req.body.title,
        price: req.body.price
    });

    await course.save();
    res.status(201).json({status: httpStatusText.SUCCESS, data: {course}});
};

//update a course
const updateCourse = async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseid, {
        title: req.body.title,
        price: req.body.price
    }, { new: true });
    if (!course) {
        res.status(404).json({status: httpStatusText.FAIL, message: "Course not found"});
    } else {
        res.json({status: httpStatusText.SUCCESS, data: {course}});
    }
};

//delete a course
const deleteCourse = async (req, res) => {

    const course =  await Course.findByIdAndDelete(req.params.courseid);

    if (!course) {
        return res.status(404).json({status: httpStatusText.FAIL, message: "Course not found"});
    }

    res.json({status: httpStatusText.SUCCESS, data: {message: "Course deleted successfully"}});

};




module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};