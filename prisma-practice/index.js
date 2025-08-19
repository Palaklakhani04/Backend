import express from "express"
import indexRouter from "./routes/index.js"
import cors from 'cors'

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(cors()); 

app.use("/api", indexRouter)

app.listen(process.env.PORT, () => {
    console.log("server is running on localhost")
})