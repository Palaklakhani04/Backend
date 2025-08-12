import express from "express"
import { createCourse, deleteCourseById, getAllCourses, getCourseById, updateCourseById } from "../controllers/course.js"

const router = express.Router()

router
    .route('/course')
    .get(getAllCourses)
    .post(createCourse)

router
    .route('/course/:id')
    .get(getCourseById)
    .put(updateCourseById)
    .delete(deleteCourseById)

export default router