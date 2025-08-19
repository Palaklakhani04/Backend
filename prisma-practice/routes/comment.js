import express from "express"
import { createComment, deleteCommentById, getAllComment, updateCommentById } from "../controllers/comment.js"


const router = express.Router()

router.route("/")
    .get(getAllComment)
    .post(createComment)

router.route("/:id")
    .put(updateCommentById)
    .delete(deleteCommentById)

export default router