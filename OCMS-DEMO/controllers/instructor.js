import { userSchema } from "../middleware/Validation.js"
import User from "../models/userModel.js"

export async function getAllInstructor(req, res){
    try {
        const instructor = await User.findAll({
            where:{
                userType: "instructor"
            }
        })
        if(!instructor) return res.status(404).json([])
        return res.status(200).json(instructor)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function getInstructorById(req, res){
    try {
        const userId = req.params.id
        const instructor = await User.findOne({
            where:{
                id: userId,
                userType: 'instructor'
            }
        })
        if(!instructor) return res.status(404).json({msg : "user not found"})
        return res.status(200).json(instructor)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function createInstructor(req, res){
    try {
        const {error} = userSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const { name, email , password, userType} = req.body
        const newuser = await User.create({ name , email, password, userType})
        return res.status(201).json(newuser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function updateInstructorById(req, res){
    try {
        const {error} = userSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const userId = req.params.id
        const instructor = await User.findOne({
            where:{
                id: userId,
                userType: 'instructor'
            }
        })
        if(!instructor) return res.status(404).json({msg : "user not found"})
        await instructor.update(req.body)
        return res.status(200).json({message : 'User Updated'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function deleteInstructorById(req, res){
    try {
        const userId = req.params.id
        const instructor = await User.findOne({
            where:{
                id: userId,
                userType: 'instructor'
            }
        })
        if(!instructor) return res.status(404).json({msg : "user not found"})
        await instructor.destroy()
        return res.status(200).json({message : 'User deleted'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

