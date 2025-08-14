import prisma from "../config/dbConnection.js"

export async function createComment(req, res) {

    const { userId, postId, comment } = req.body
    
    const newcomment = await prisma.comment.create({
        data:{
            userId,
            postId,
            comment
        }
    })
    return res.status(200).json(newcomment, {message: "comment created successfully"})
}

export async function updateCommentById(req, res) {

    const commentId = req.params.id

    const { userId, postId, comment } = req.body

    const updated = await prisma.comment.update({
        where: {
            id: Number(commentId)
        },
        data: {
            userId,
            postId,
            comment
        }
    })
    return res.status(200).json({message: "updated successfully"})
}

export async function getAllComment(req , res) {

    const allcomment = await prisma.comment.findMany({})

    if(!allcomment) return res.status(404).json({message: "comment not found"})

    return res.status(200).json(allcomment)
}

export async function getCommentById(req, res) {

    const commentId = req.params.id

    const comment = await prisma.comment.findFirst({
        where: {
            id: Number(commentId)
        }
    })

    if(!comment) return res.status(404).json({message: "comment not found"})

    return res.status(200).json(comment)

}

export async function deleteCommentById(req, res) {
    
    const commentId = req.params.id

    await prisma.comment.delete({
        where: {
            id: Number(commentId)
        }
    })

    return res.status(200).json({message: "deleted successfully"})
}