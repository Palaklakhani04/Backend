import express from "express"
import { createEnrollment, deleteEnrollmentById, getAllEnrollment } from "../controllers/enrollment.js"

const router = express.Router()

router
    .route('/enrollments')
    .get(getAllEnrollment)
    .post(createEnrollment)

router.delete(('/enrollments/:id'),deleteEnrollmentById)

export default router