import express from "express"
import { createUser, updateById, getAllUsers, getUserById, deleteUserById, getPostByPsw } from "../controllers/user.js"

const router = express.Router()

router
    .route("/user")
    .get(getAllUsers)
    .post(createUser)
    
router.get("/user/psw",getPostByPsw)

router
    .route("/user/:id")
    .put(updateById)
    .get(getUserById)
    .delete(deleteUserById)

export default router