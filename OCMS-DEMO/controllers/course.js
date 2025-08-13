import { courseSchema } from "../middleware/Validation.js";
import { Categorie, User, Course } from "../association.js"
import { Op } from "sequelize";

export async function getAllCourses(req, res){
    try {
        const { limit, offset, search, sortBy, sortorder , categorieId} = req.query;

        const options = {
            limit: Number(limit) || 10,
            offset: Number(offset) || 0,
            where:{},
            order:[],
        }

        if(search) {
            options.where.title = {
                [Op.like]: `%${search}%`
            }
        }
        if(categorieId){
            options.where.categorieId = categorieId
        }

        if(sortBy && sortorder) {
            options.order.push([sortBy, sortorder.toUpperCase()])
        }else{
            options.order.push(['price', 'DESC'])
        }

        const coures = await Course.findAll({
            options,
            include :[
                {
                    model: Categorie,
                    attributes:["id","name"],
                    as: 'category'
                },
                {
                    model: User,
                    attributes:["id","name", "email"],
                    as: 'instructor'
                    
                }
            ]
        })
        console.log(coures)
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
        console.log(error)
        return res.status(500).json({ error : error.message})
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
        console.log(error)
        return res.status(500).json({ error : error.message})
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
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}