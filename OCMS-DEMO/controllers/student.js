import { Op } from "sequelize";
import { userSchema } from "../middleware/Validation.js"
// import {User} from "../association.js"
import User from '../models/userModel.js'
import { Enrollment } from "../association.js";

export async function getAllStudents(req, res){
    try {
        const { limit, offset, search, sortBy, sortorder } = req.query;

        const options = {
            limit: Number(limit) || 10,
            offset: Number(offset) || 0,
            where:{},
            order:[]
        }

        if(search) {
            options.where.name = {
                [Op.like]: `%${search}%`
            }
        }

        options.where.userType = "student"

        if(sortBy && sortorder) {
            options.order.push([sortBy, sortorder.toUpperCase()])
        }else{
            options.order.push(['name', 'DESC'])
        }

        const students = await User.findAll(options)
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
    console.log(req.body)
    try {
        const {error} = userSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const { name, email, password, userType} = req.body
        const newuser = await User.create({ name , email, password, userType})
        return res.status(201).json(newuser)
    } catch (error) {
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

export async function getStudentEnrollCourse(req, res) {
    try {
        const stdId = req.params.id
        const stdEnroll = await Enrollment.findAll({
            where:{
                studentId : stdId
            }
        })
        if(!stdEnroll) return res.status(404).json({msg : "student not Enroll"})
        return res.status(200).json(stdEnroll)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}