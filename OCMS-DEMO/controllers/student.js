import { userSchema } from "../middleware/Validation.js"
import User from "../models/userModel.js"

export async function getAllStudents(req, res){
    try {
        const students = await User.findAll({
            where:{
                userType: "student"
            }
        })
        if(!students) return res.status(404).json([])
        return res.status(200).json(students)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function getStudentById(req, res){
    try {
        const userId = req.params.id
        const student = await User.findOne({
            where:{
                id: userId,
                userType: 'student'
            }
        })
        if(!student) return res.status(404).json({msg : "user not found"})
        return res.status(200).json(student)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function createStudent(req, res){
    try {
        const {error} = userSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const { name, email, password, userType} = req.body
        const newuser = await User.create({ name , email, password, userType})
        return res.status(201).json(newuser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function updateStudentById(req, res){
    try {
        const {error} = userSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const userId = req.params.id
        const student = await User.findOne({
            where:{
                id: userId,
                userType: 'student'
            }
        })
        if(!student) return res.status(404).json({msg : "user not found"})
        await student.update(req.body)
        return res.status(200).json({message : 'User Updated'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function deleteStudentById(req, res){
    try {
        const userId = req.params.id
        const student = await User.findOne({
            where:{
                id: userId,
                userType: 'student'
            }
        })
        if(!student) return res.status(404).json({msg : "user not found"})
        await student.destroy()
        return res.status(200).json({message : 'User deleted'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}