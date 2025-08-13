import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    userType: Joi.string().valid('student', 'instructor').default('student').optional()
})

export const categorieSchema = Joi.object({
    name: Joi.string().required()
})

export const courseSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().min(0).required(),
    instructorId: Joi.number().min(0).required(),
    categorieId: Joi.number().min(0).required()
})

export const enrollmentSchema = Joi.object({
    studentId: Joi.number().min(0).required(),
    courseId: Joi.number().min(0).required()
})