import { userDetailSchema } from "../middleware/userValidate.js";
import UserDetail from "../models/userDetailModel.js";
import User  from "../models/userModel.js";
// import joi from 'Joi'

export async function insert(req,res){
    const data = User.build({name : 'jane'});
    console.log(data.name)
    await data.save()
    res.json({data})
}

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
    
}

export async function deleteUsersById(req,res){
    
}

