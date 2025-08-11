import { QueryTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import { userDetailSchema } from "../middleware/userValidate.js";
import UserDetail from "../models/userDetailModel.js";
import User  from "../models/userModel.js";
import Employee from "../models/employeeModel.js";
import Profile from "../models/profile.js";
import Post from "../models/postModel.js";
import Student from "../models/studentModel.js";
import Course from "../models/courseModel.js";


// for user model
export async function insert(req,res){
    const data = User.build({name : 'jane'});
    console.log(data.name)
    await data.save()
    res.json({data})

    // const result = await sequelize.query('SELECT * FROM usersData' , {
    //     type: QueryTypes.SELECT,
    //     model: User,
    //     mapToModel: true
    // })

    // const result = await sequelize.query('SELECT * FROM usersData WHERE favoriteColor = ? and id = ?', {
    //     replacements: ['green', 2],
    //     type: QueryTypes.SELECT,
    // });

    return res.json({result})

}

// association
export async function createEmployee(req, res) {
    try {
        const employee = await Employee.create({name : 'joy'})
        const profile = await Profile.create({bio: 'hello , joy', emId: employee.id})
        const post1 = await Post.create({content: "first post", emId:employee.id})
        const post2 = await Post.create({content: "seconde post", emId:employee.id})

        // const vivek = await Student.create({ name: "vivek"})
        // const rina = await Student.create({ name: "rina"})

        // const math = await Course.create({title: "math"})
        // const comp = await Course.create({title: "comp"})

        // await vivek.addCourse(math)
        // await vivek.addCourse(comp)
        // await rina.addCourse(comp)

        return res.status(200).json({employee, profile ,post1, post2})
        // return res.status(200).json({math})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function getAllEmployee(req, res) {
    try {
        // const employeewithprofile = await Employee.findAll({
        //     include : {
        //         model: Profile, as : 'profile'
        //     }
        // })

        const employeewithprofile = await Employee.findAll({
            include : {
                model: Post, as : 'post'
            }
        })

        // const employeewithprofile = await Course.findAll({
        //     include: Student
        // }) 

        return res.status(200).json(employeewithprofile)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

// for userDetail model
export async function getAllUsers(req,res){
    try {
        const users = await UserDetail.findAll()
        return res.status(200).json({users})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
    
}

export async function getUserById(req,res){
    try {
        const users = await UserDetail.findByPk(req.params.id)
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function addUsers(req,res){
    try {
        const {error} = userDetailSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const user = await UserDetail.create(req.body)
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function updateUsersById(req,res){
    try {
        const {error} = userDetailSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const user = await UserDetail.findByPk(req.params.id)
        if(!user) return res.status(500).json({ error : 'User not found'})

        await user.update(req.body)
        return res.status(200).json({message : 'User Updated'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function deleteUsersById(req,res){
    try {
        const user = await UserDetail.findByPk(req.params.id)
        if(!user) return res.status(500).json({ error : 'User not found'})
        await user.destroy()
        return res.status(200).json({message : 'User deleted'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

