import { courseSchema } from "../middleware/Validation.js";
import Categorie from "../models/categoriesModel.js";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

export async function getAllCourses(req, res){
    try {
        const coures = await Course.findAll({})
        if(!coures) return res.status(404).json([])
        return res.status(200).json(coures)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function getCourseById(req, res){
    try {
        const courseId = req.params.id
        const course = await Course.findOne({
            where:{
                id: courseId,
            }
        })
        if(!course) return res.status(404).json({msg : "categorie not found"})
        return res.status(200).json(course)
    } catch (error) {
        
    }
}

export async function createCourse(req, res){
    try {
        const { error } = courseSchema.validate(req.body)
        if(error) return res.status(400).json({message : error.details})
        
        const { title, price, categorieId, instructorId } = req.body

        const newCourse = await Course.create({title, price, categorieId, instructorId})
        return res.status(201).json(newCourse)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})   
    }
}

export async function updateCourseById(req, res){
    try {
        const {error} = courseSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const courseId = req.params.id
        const coures = await Course.findOne({
            where:{
                id: courseId
            }
        })
        if(!coures) return res.status(404).json({msg : "coures not found"})
        await coures.update(req.body)
        return res.status(200).json({message : 'coures Updated'})
    } catch (error) {
        
    }
}

export async function deleteCourseById(req, res){
    try {
        const courseId = req.params.id
        const course = await Course.findOne({
            where:{
                id: courseId,
            }
        })
        if(!course) return res.status(404).json({msg : "course not found"})
        await course.destroy()
        return res.status(200).json({message : 'course deleted'})
        
    } catch (error) {
        
    }
}