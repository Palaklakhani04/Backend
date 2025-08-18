import express from "express"
import { createUser, updateById, getAllUsers, getUserById, deleteUserById, getUsersByEmailEndsWiths } from "../controllers/user.js"

const router = express.Router()

router
    .route("/")
    .get(getAllUsers)
    .post(createUser)
    
router.get("/email",getUsersByEmailEndsWiths)

router
    .route("/:id")
    .put(updateById)
    .get(getUserById)
    .delete(deleteUserById)

export default router