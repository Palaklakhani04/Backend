import prisma from "../config/dbConnection.js"

export async function createUser(req, res) {
    const { name, email, password } = req.body

    const findEmail = await prisma.user.findUnique({
        where: {
            email:email
        }
    })

    if(findEmail) return res.status(400).json({ message: "email already exist."})
    
    const newUser = await prisma.user.create({
        data:{
            name: name,
            email: email,
            password: password
        }
    })
    return res.status(200).json(newUser, {message: "User created successfully"})
}

export async function updateById(req, res) {

    const userId = req.params.id

    const { name, email, password } = req.body

    const updated = await prisma.user.update({
        where: {
            id: Number(userId)
        },
        data: {
            name,
            email,
            password
        }
    })
    return res.status(200).json({message: "updated successfully"})
}

export async function getAllUsers(req , res) {

    const allUser = await prisma.user.findMany({
        include: {
            post :{
                select:{
                    commentCount:true,
                    title: true
                }
            }
        }
    })

    if(!allUser) return res.status(404).json({message: "user not found"})

    return res.status(200).json(allUser)
}

export async function getUserById(req, res) {

    const userId = req.params.id

    const user = await prisma.user.findFirst({
        where: {
            id: Number(userId)
        },
        include:{
            post:{
                select:{
                    title:true,
                    comment:{
                        select:{
                            comment:true
                        }
                    }
                }
            }
        }
        
    })

    if(!user) return res.status(404).json({message: "user not found"})

    return res.status(200).json(user)

}

export async function deleteUserById(req, res) {
    
    const userId = req.params.id

    await prisma.user.delete({
        where: {
            id: Number(userId)
        }
    })

    return res.status(200).json({message: "deleted successfully"})
}

export async function getPostByPsw(req, res) {
    const user = await prisma.user.findMany({
        skip:1,
        take:3,
        where:{
            OR : [{
                email:{
                    contains: "@gmail.com"
                }
            },{
                email: {
                    contains: "company.com"
                }
            }
            ]
        }
    })

    res.json(user)
}