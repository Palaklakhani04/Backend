import express from "express"
import conneteMongoDb from "./connection.js"
import dotenv from "dotenv"
import salesRouter from "./routes/sales.js"
import multer from "multer"

dotenv.config()

const app = express()
const port = process.env.PORT

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb( null , './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type.'), false);
    }
};

const upload = multer({storage: storage , fileFilter:fileFilter})

conneteMongoDb(process.env.DB_HOST)
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/sales', salesRouter)
app.use('/products',upload.single('thumbnail'), salesRouter)

app.listen(port,() => console.log(`server running at port: ${port}`))