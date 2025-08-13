import express from "express"
import { createInstructor, deleteInstructorById, getAllInstructor, getInstructorAllCourses, getInstructorById, updateInstructorById } from "../controllers/instructor.js"

const router = express.Router()

router
    .route('/instructor')
    .get(getAllInstructor)
    .post(createInstructor)

router
    .route('/instructor/:id')
    .get(getInstructorById)
    .put(updateInstructorById)
    .delete(deleteInstructorById)

router.get("/instructor/:id/courses", getInstructorAllCourses)

export default router