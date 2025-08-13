import express from 'express'
import { sequelize } from './config/dbConnection.js'
import dotenv from 'dotenv'
import studentRouter from './routes/student.js'
import categorieRouter from './routes/categorie.js'
import courseRouter from './routes/course.js'
import instructorRouter from './routes/instructor.js'
import enrollmentRouter from './routes/enrollment.js'

dotenv.config()

await sequelize.sync({ force: false}).then(() => console.log('susccessfull')).catch((error) => console.log(error))

const app = express()

app.use(express.json())


app.use("/", studentRouter, instructorRouter, categorieRouter, courseRouter, enrollmentRouter)

app.listen(process.env.PORT, async () => {
    console.log(`server running at port: ${process.env.PORT}`)
})