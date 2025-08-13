import express from "express"
import { createStudent, deleteStudentById, getAllStudents, getStudentById, getStudentEnrollCourse, updateStudentById } from "../controllers/student.js"

const router = express.Router()

router
    .route('/student')
    .get(getAllStudents)
    .post(createStudent)

router
    .route('/student/:id')
    .get(getStudentById)
    .put(updateStudentById)
    .delete(deleteStudentById)

router.get("/student/:id/enrollments", getStudentEnrollCourse)
export default router