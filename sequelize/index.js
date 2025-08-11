import express from "express"
import dotenv from "dotenv"
import { dbConnection ,sequelize} from "./config/dbConnection.js"
import userRouter from "./routes/user.js"
import './association.js'

dotenv.config()

const app = express()

app.use(express.json())

const port = process.env.PORT

sequelize.sync({force: false})
app.use("/api" , userRouter)


app.listen(port, async () => {
    console.log(`server running at port: ${port}`)
    await dbConnection()
})