import Joi from "joi";

export const userDetailSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().integer().min(0).required(),
    mobileNumber: Joi.string().required(),
    isActive: Joi.boolean().default(true)
})