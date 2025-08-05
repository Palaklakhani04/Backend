import express from "express"
import connectMongoDb from "./connection.js"
import { bookRouter } from "./routes/book.js";
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT
const dbHost = process.env.DB_HOST
const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_PORT,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

connectMongoDb(dbHost)

app.use("/books",bookRouter)

app.listen(port , () => console.log(`server running at port: ${port}`))