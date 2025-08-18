import prisma from "../config/dbConnection.js"
import { createPosts, deleteByPostId, getAllPosts, getByPostId, updateByPostId } from "../service/post.js"
import message from "../utils/message.js"

export async function createPost(req, res) {
    try {
        const { userId, title, description } = req.body
        
        const newPost = await createPosts( userId, title, description )

        return res.status(200).json(newPost, {message: message.SUCCESS.DATA_CREATED})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }

}

export async function updatePostById(req, res) {
    try {
        const { id } = req.params
    
        const { userId, title, description } = req.body
    
        await updateByPostId( id, userId, title, description )

        return res.status(200).json({message: message.SUCCESS.DATA_UPDATED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }

}

export async function getAllPost(req , res) {
    try {
        const allPost = await getAllPosts()
    
        if(!allPost) return res.status(404).json([],{message: message.ERROR.NOT_FOUND})
    
        return res.status(200).json({allPost, message: message.SUCCESS.DATA_FETCHED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }

}

export async function getPostById(req, res) {
    try {
        const { id } = req.params
    
        const post = await getByPostId(id)
    
        if(!post) return res.status(404).json({message: message.ERROR.NOT_FOUND})
    
        return res.status(200).json({post, message: message.SUCCESS.DATA_FETCHED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }
}

export async function deletePostById(req, res) {
    try {
        const { id } = req.params
    
        await deleteByPostId(id)
    
        return res.status(200).json({message: message.SUCCESS.DATA_DELETED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }
}

