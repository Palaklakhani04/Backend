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
                id: id
            },
            data: {
                userId,
                postId,
                comment
            }
        })
}

export const getallComments = async (filter) => {
    return await prisma.comment.findMany({
        where: filter
    })
}

export const getByCommentId = async (id) => {
    return await prisma.comment.findFirst({
            where: {
                id: id
            }
        })
    
}

export const deleteByCommentId = async (id) => {
    return await prisma.comment.delete({
            where: {
                id: id
            }
        })
}

