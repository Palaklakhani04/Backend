import Joi from "joi"

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

export const postSchema = Joi.object({
    userId: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    thumbnail: Joi.string().required()
})

export const commentSchema = Joi.object({
    userId: Joi.number().required(),
    postId: Joi.number().required(),
    comment: Joi.string().required(),
})