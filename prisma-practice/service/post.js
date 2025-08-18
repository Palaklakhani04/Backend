import prisma from "../config/dbConnection.js"

export const createPosts = async ( userId, title, description ) => {
    return await prisma.post.create({
            data:{
                userId,
                title,
                description
            }
        })
}

export const updateByPostId = async ( id, userId, title, description ) => {
    return await prisma.post.update({
            where: {
                id: Number(id)
            },
            data: {
                userId,
                title,
                description
            }
        })
}

export const getAllPosts = async () => {
    return await prisma.post.findMany({
            include:{
                user: {
                    select :{
                        name: true,
                        email: true
                    }
                }
            }
    })
}

export const getByPostId = async (id) => {
    return await prisma.post.findFirst({
            where: {
                id: Number(id),
            },
    })
}

export const deleteByPostId = async (id) => {
    return await prisma.post.delete({
            where: {
                id: Number(id)
            }
        })
}

