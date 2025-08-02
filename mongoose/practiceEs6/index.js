import express from "express"
import { router } from "./routes/user.js"
import {connectMongoDb} from "./connection.js"

const app = express()
const PORT = 3000

connectMongoDb("mongodb://127.0.0.1:27017/login")
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => console.log("Mongo Error", err))

app.use(express.urlencoded({ extended: false }))

app.use("/user", router)

app.listen(PORT , () => console.log(`server running at port: ${PORT}`))
