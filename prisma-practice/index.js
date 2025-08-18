import prisma from "./config/dbConnection.js";
import express from "express"
import userRouter from "./routes/user.js"
import postRouter from "./routes/post.js"
import commentRouter from "./routes/comment.js"

const app = express()

app.use(express.json())

app.use("/api/user", userRouter)

app.use("/api/post", postRouter)

app.use("/api/comment", commentRouter)

app.listen(process.env.PORT, () => {
    console.log("server is running on localhost")
})