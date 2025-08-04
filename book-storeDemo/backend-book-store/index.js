import express from "express"
import connectMongoDb from "./connection.js"
import { router } from "./routes/book.js";
import cors from 'cors'
import { BookDetails } from "./models/bookDetail.js";

const app = express()
const PORT = 3000

app.use(express.json())

connectMongoDb("mongodb://127.0.0.1:27017/books")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error" , err));

const corsOptions = {
      origin: 'http://localhost:5173', // Allow only this origin
      methods: 'GET,HEAD,PUT,DELETE', // Allowed HTTP methods
    };

app.use(cors(corsOptions));

app.use("/books",router)

app.listen(PORT , () => console.log(`server running at port: ${PORT}`))