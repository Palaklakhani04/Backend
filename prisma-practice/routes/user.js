import express from "express"
import { createUser, updateById, getAllUsers, getUserById, deleteUserById, getPostByPsw } from "../controllers/user.js"

const router = express.Router()

router
    .route("/")
    .get(getAllUsers)
    .post(createUser)
    
router.get("/psw",getPostByPsw)

router
    .route("/:id")
    .put(updateById)
    .get(getUserById)
    .delete(deleteUserById)

export default router