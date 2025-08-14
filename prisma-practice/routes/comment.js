import express from "express"
import { createComment, deleteCommentById, getAllComment, getCommentById, updateCommentById } from "../controllers/comment.js"


const router = express.Router()

router.route("/comment")
    .get(getAllComment)
    .post(createComment)

router.route("/comment/:id")
    .get(getCommentById)
    .put(updateCommentById)
    .delete(deleteCommentById)

export default router