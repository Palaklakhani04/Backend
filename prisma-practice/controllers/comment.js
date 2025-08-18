import { createComments, deleteByCommentId, getallComments, getByCommentId, updateByCommentId } from "../service/comment.js"
import message from "../utils/message.js"

export async function createComment(req, res) {
    try {
        const { userId, postId, comment } = req.body
        
        const newcomment = await createComments(userId, postId, comment)

        return res.status(200).json({success : true, message: message.SUCCESS.DATA_CREATED})
        
    } catch (error) {
        res.status(500).json({message: message.ERROR.SERVER_ERROR})   
    }
}


export async function updateCommentById(req, res) {
    try {
        const { id } = req.params
    
        const findId = await getByCommentId(id)

        if(!findId) throw new Error(message.ERROR.NOT_FOUND)

        const { userId, postId, comment } = req.body
    
        await updateByCommentId(id, userId, postId, comment )
        
        return res.status(200).json({success:true, message: message.SUCCESS.DATA_UPDATED})
        
    } catch (error) {
        res.status(500).json({message: message.ERROR.SERVER_ERROR, error: error.message})
    }

}

export async function getAllComment(req , res) {
    try {
        const allcomment = await getallComments()
    
        return res.status(200).json({allcomment, message: message.SUCCESS.DATA_FETCHED})
        
    } catch (error) {
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }

}

export async function getCommentById(req, res) {
    try {
        const { id } = req.params
    
        const findId = await getByCommentId(id)

        if(!findId) throw new Error(message.ERROR.NOT_FOUND)
    
        return res.status(200).json({findId,success:true, message: message.SUCCESS.DATA_FETCHED})
        
    } catch (error) {
        res.status(500).json({message: message.ERROR.SERVER_ERROR, error:error.message})
    }

}

export async function deleteCommentById(req, res) {
    try {
        const { id } = req.params
    
        const findId = await getByCommentId(id)

        if(!findId) throw new Error(message.ERROR.NOT_FOUND)
        
        await deleteByCommentId(id)
    
        return res.status(200).json({success:true, message: message.SUCCESS.DATA_DELETED})
        
    } catch (error) {
        res.status(500).json({ message: message.ERROR.SERVER_ERROR, error: error.message})
    }
}