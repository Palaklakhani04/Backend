import prisma from "../config/dbConnection.js"

export const createComments = async (userId, postId, comment) => {
    return await prisma.comment.create({
            data:{
                userId,
                postId,
                comment
            }
        })
}

export const updateByCommentId = async (id, userId, postId, comment ) => {
    return await prisma.comment.update({
            where: {
                id: Number(id)
            },
            data: {
                userId,
                postId,
                comment
            }
        })
}

export const getallComments = async () => {
    return await prisma.comment.findMany({})
}

export const getByCommentId = async (id) => {
    return await prisma.comment.findFirst({
            where: {
                id: Number(id)
            }
        })
    
}

export const deleteByCommentId = async (id) => {
    return await prisma.comment.delete({
            where: {
                id: Number(id)
            }
        })
}

