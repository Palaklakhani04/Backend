import { commentSchema } from "../middlewares/validation.js"
import { createComments, deleteByCommentId, getallComments, getByCommentId, updateByCommentId } from "../service/comment.js"
import message from "../utils/message.js"

export async function createComment(req, res) {
    try {
        const {error} = commentSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const { userId, postId, comment } = req.body
        const newcomment = await createComments(userId, postId, comment)

        return res.status(200).json({success : true, newcomment, message: message.SUCCESS.DATA_CREATED})
        
    } catch (error) {
        res.status(500).json({message: message.ERROR.SERVER_ERROR})   
    }
}


export async function updateCommentById(req, res) {
    try {
        const {error} = commentSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const { userId, postId, comment } = req.body
        const { id } = req.params
        const commentId = await getByCommentId(id)
        if(!commentId) throw new Error(message.ERROR.NOT_FOUND)

        await updateByCommentId(id, userId, postId, comment )
        return res.status(200).json({success:true, message: message.SUCCESS.DATA_UPDATED})
        
    } catch (error) {
        res.status(500).json({message: message.ERROR.SERVER_ERROR, error: error.message})
    }

}

export async function getAllComment(req , res) {
    try {
        const { userId , postId } = req.query
        const filter = {}

        if(userId){
            filter.userId = {
                equals: Number(userId)
            }
        }

        if(postId){
            filter.postId = {
                equals : Number(postId)
            }
        }

        console.log(filter)
        const allcomment = await getallComments(filter)

        return res.status(200).json({allcomment, message: message.SUCCESS.DATA_FETCHED})
        
    } catch (error) {
        res.status(500).json({message: message.ERROR.SERVER_ERROR})
    }

}

export async function deleteCommentById(req, res) {
    try {
        const { id } = req.params
        const comment = await getByCommentId(id)
        if(!comment) throw new Error(message.ERROR.NOT_FOUND)
        
        await deleteByCommentId(id)
        return res.status(200).json({success:true, message: message.SUCCESS.DATA_DELETED})
        
    } catch (error) {
        res.status(500).json({ message: message.ERROR.SERVER_ERROR, error: error.message})
    }
}