import express from "express"
import { deleteUserById, getUserById, handleCreateNewUser, handleGetAllUsers, updateUserById } from "../controllers/user.js"

export const router = express.Router()

router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

router
    .route("/:id")
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)



