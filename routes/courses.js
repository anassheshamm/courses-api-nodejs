const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/coursesController');

const validateCourse = require('../middleware/validateCourse');
const verifyToken = require('../middleware/verifyToken');
const allowedTo = require('../middleware/allowedTo');

//get all courses
router.route('/')
.get(verifyToken, coursesController.getAllCourses)
.post(verifyToken, allowedTo("admin"), validateCourse, coursesController.createCourse);



//get course by id
router.route('/:courseid')
.get(verifyToken, coursesController.getCourseById)
.put(verifyToken, allowedTo("admin"), validateCourse, coursesController.updateCourse)
.delete(verifyToken, allowedTo("admin"), coursesController.deleteCourse);



module.exports = router;