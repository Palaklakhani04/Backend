import express from "express"
import { createPost, deletePostById, getAllPost, getPostById, updatePostById } from "../controllers/post.js"

const router = express.Router()

router.route("/post")
    .get(getAllPost)
    .post(createPost)

router.route("/post/:id")
    .get(getPostById)
    .put(updatePostById)
    .delete(deletePostById)

export default router