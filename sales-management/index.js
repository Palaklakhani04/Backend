import express from "express"
import conneteMongoDb from "./connection.js"
import dotenv from "dotenv"
import salesRouter from "./routes/sales.js"

dotenv.config()

const app = express()
const port = process.env.PORT

conneteMongoDb(process.env.DB_HOST)

app.use('/api/sales', salesRouter)

app.listen(port,() => console.log(`server running at port: ${port}`))