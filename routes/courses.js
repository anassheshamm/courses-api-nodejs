const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/coursesController');

const validateCourse = require('../middleware/validateCourse');


//get all courses
router.route('/')
.get(coursesController.getAllCourses)
.post(validateCourse, coursesController.createCourse);



//get course by id
router.route('/:courseid')
.get(coursesController.getCourseById)
.put(validateCourse, coursesController.updateCourse)
.delete( coursesController.deleteCourse);



module.exports = router;