import { createComments, deleteByCommentId, getallComments, getByCommentId, updateByCommentId } from "../service/comment.js"
import message from "../utils/message.js"

export async function createComment(req, res) {
    try {
        const { userId, postId, comment } = req.body
        
        const newcomment = await createComments(userId, postId, comment)

        return res.status(200).json(newcomment, {message: message.SUCCESS.DATA_CREATED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})   
    }
}


export async function updateCommentById(req, res) {
    try {
        const { id } = req.params
    
        const { userId, postId, comment } = req.body
    
        await updateByCommentId(id, userId, postId, comment )
        
        return res.status(200).json({message: message.SUCCESS.DATA_UPDATED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }

}

export async function getAllComment(req , res) {
    try {
        const allcomment = await getallComments()
    
        if(!allcomment) return res.status(404).json([],{message: message.ERROR.NOT_FOUND})
    
        return res.status(200).json({allcomment, message: message.SUCCESS.DATA_FETCHED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }

}

export async function getCommentById(req, res) {
    try {
        const { id } = req.params
    
        const comment = await getByCommentId(id)
        
        if(!comment) return res.status(404).json({message: message.ERROR.NOT_FOUND})
    
        return res.status(200).json({comment, message: message.SUCCESS.DATA_FETCHED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }

}

export async function deleteCommentById(req, res) {
    try {
        const { id } = req.params
    
        await deleteByCommentId(id)
    
        return res.status(200).json({message: message.SUCCESS.DATA_DELETED})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }
}