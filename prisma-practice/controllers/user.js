import prisma from "../config/dbConnection.js"
import message from "../utils/message.js"
import { checkEmail, createUsers, deleteByUserId, getAllUser, getByEmail, getByUserId, updatedById } from "../service/user.js"

export async function createUser(req, res) {
    try {
        const { name, email, password } = req.body
    
        const findEmail = await checkEmail(email)
    
        if(findEmail) return res.status(400).json({ message: message.ERROR.EMAIL_EXISTS })
        
        const newUser = await createUsers( name, email, password )
        
        return res.status(200).json({newUser, message: message.SUCCESS.DATA_CREATED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }
}

export async function updateById(req, res) {
    try {
        const { id } = req.params

        const { name, email, password } = req.body
    
        await updatedById(id, name , email, password)

        return res.status(200).json({message: message.SUCCESS.DATA_UPDATED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }

}

export async function getAllUsers(req , res) {
    try {
        const allUser = await getAllUser()
    
        if(!allUser) return res.status(404).json([], {message: message.ERROR.NOT_FOUND})
    
        return res.status(200).json({allUser , message : message.SUCCESS.DATA_FETCHED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }

}

export async function getUserById(req, res) {
    try {
        const { id } = req.params
    
        const user = await getByUserId(id)
    
        if(!user) return res.status(404).json({message: message.ERROR.NOT_FOUND})
    
        return res.status(200).json({user, message: message.SUCCESS.DATA_FETCHED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }
}

export async function deleteUserById(req, res) {
    try {
        const { id } = req.params
    
        await deleteByUserId(id)
    
        return res.status(200).json({message: message.SUCCESS.DATA_DELETED})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }
}

export async function getPostByPsw(req, res) {
    try {
        const user = await getByEmail()
    
        res.status(200).json({user, message: message.SUCCESS.DATA_FETCHED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }
}