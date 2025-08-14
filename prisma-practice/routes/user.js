import express from "express"
import { createUser, updateById, getAllUsers, getUserById, deleteUserById } from "../controllers/user.js"

const router = express.Router()

router
    .route("/user")
    .get(getAllUsers)
    .post(createUser)

router
    .route("/user/:id")
    .put(updateById)
    .get(getUserById)
    .delete(deleteUserById)

export default router