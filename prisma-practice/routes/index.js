import { Router } from "express";
import userRouter from "./user.js"
import postRouter from "./post.js"
import commentRouter from "./comment.js"
import {upload} from "../utils/upload.js"

const router = Router()

router.use("/user", userRouter)
router.use("/post", upload.single('thumbnail') ,postRouter)
router.use("/comment", commentRouter)

export default router