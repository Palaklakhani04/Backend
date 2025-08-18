import prisma from "../config/dbConnection.js"

export const checkEmail = async (email) => {

    return await prisma.user.findUnique({
            where: {
                email:email
            }
        })  
    
}

export const createUsers = async (name , email, password) => {
    return await prisma.user.create({
            data:{
                name,
                email,
                password
            }
        })
}

export const updatedById = async (id, name , email, password) => {
    return await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                email,
                password
            }
        })
}


export const getAllUser = async (filter, skip, take) => {
    return await prisma.user.findMany({
            where: filter,
            skip,
            take,
            include: {
                post :{
                    select:{
                        title: true
                    }
                }
            }
        })
}

export const getByUserId = async (id) => {
    return await prisma.user.findFirst({
            where: {
                id: Number(id)
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
}

export const deleteByUserId = async (id) => {
    await prisma.user.delete({
            where: {
                id: Number(id)
            }
    })
}

export const getUserByEmailEndsWith = async () => {
    return await prisma.user.findMany({
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
}

export const findById = async (id) => {
    return await prisma.user.findFirst({
        where: {
            id:Number(id)
        }
    })
}