import { User } from "../models/user.js";

export async function handleGetAllUsers(req ,res) {
    const allUsers = await User.find({});
    return res.json(allUsers)
}

export async function getUserById(req ,res) {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "user not found" })
    return res.json(user)
}

export async function updateUserById(req ,res) {
    await User.findByIdAndUpdate(req.params.id, req.body)
    return res.json({ status: "Success" })
}

export async function deleteUserById(req ,res) {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success"})
}

export async function handleCreateNewUser(req ,res) {
    const body = req.body;
    if(
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.gender ||
        !body.jobTitle
    ) {
        return res.status(400).json( { msg: "All fields are required" })
    }

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle      
    })
    return res.status(201).json({ msg: "Success" })
}

