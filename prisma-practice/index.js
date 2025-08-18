import prisma from "./config/dbConnection.js";
import express from "express"
import indexRouter from "./routes/index.js"

const app = express()

app.use(express.json())

app.use("/api", indexRouter)

app.listen(process.env.PORT, () => {
    console.log("server is running on localhost")
})