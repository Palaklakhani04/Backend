import prisma from "../config/dbConnection.js"

export async function createPost(req, res) {

    const { userId, title, description } = req.body
    
    const newPost = await prisma.post.create({
        data:{
            userId,
            title,
            description
        }
    })
    return res.status(200).json(newPost, {message: "Post created successfully"})
}

export async function updatePostById(req, res) {

    const postId = req.params.id

    const { userId, title, description } = req.body

    const updated = await prisma.post.update({
        where: {
            id: Number(postId)
        },
        data: {
            userId,
            title,
            description
        }
    })
    return res.status(200).json({message: "updated successfully"})
}

export async function getAllPost(req , res) {

    const allPost = await prisma.post.findMany({})

    if(!allPost) return res.status(404).json({message: "post not found"})

    return res.status(200).json(allPost)
}

export async function getPostById(req, res) {

    const postId = req.params.id

    const post = await prisma.post.findFirst({
        where: {
            id: Number(postId)
        }
    })

    if(!post) return res.status(404).json({message: "post not found"})

    return res.status(200).json(post)

}

export async function deletePostById(req, res) {
    
    const postId = req.params.id

    await prisma.post.delete({
        where: {
            id: Number(postId)
        }
    })

    return res.status(200).json({message: "deleted successfully"})
}