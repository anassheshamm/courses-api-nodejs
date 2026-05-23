const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const validateCourse = require('../middleware/validateCourse');
const verifyToken = require('../middleware/verifyToken');
const allowedTo = require('../middleware/allowedTo');
const asyncWrapper = require('../middleware/asyncWrapper');

//get all courses
router.route('/')
.get(verifyToken, asyncWrapper(coursesController.getAllCourses))
.post(verifyToken, allowedTo("admin"), validateCourse, asyncWrapper(coursesController.createCourse));



//get course by id
router.route('/:courseid')
.get(verifyToken, asyncWrapper(coursesController.getCourseById))
.put(verifyToken, allowedTo("admin"), validateCourse, asyncWrapper(coursesController.updateCourse))
.delete(verifyToken, allowedTo("admin"), asyncWrapper(coursesController.deleteCourse));



module.exports = router;