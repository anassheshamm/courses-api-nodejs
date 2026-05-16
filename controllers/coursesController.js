const Course = require("../models/course");

//get all courses
const getAllCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
};

//get course by id
const getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.courseid);
    if (!course) {
        res.status(404).send("Course not found");
    } else {
        res.json(course);
    }
};

//create a new course
const createCourse = async (req, res) => {
    console.log(req.body);

    const course = new Course({
        title: req.body.title,
        price: req.body.price
    });

    await course.save();
    res.status(201).json(course);
};

//update a course
const updateCourse = async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseid, {
        title: req.body.title,
        price: req.body.price
    }, { new: true });
    if (!course) {
        res.status(404).send("Course not found");
    } else {
        res.json(course);
    }
};

//delete a course
const deleteCourse = async (req, res) => {

    const course =  await Course.findByIdAndDelete(req.params.courseid);

    if (!course) {
        return res.status(404).send("Course not found");
    }

    res.json({message: "Course deleted successfully"});

};




module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};