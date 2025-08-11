import express  from "express"
import { addUsers, createEmployee, deleteUsersById, getAllEmployee, getAllUsers, getUserById, insert, updateUsersById } from "../controllers/user.js";

const userRouter = express.Router()

userRouter.post('/createemployee', createEmployee)

userRouter.get('/getallemployee', getAllEmployee)

userRouter.get('/', insert)

// CURD api UserDetail model

userRouter.get('/getallusers', getAllUsers)

userRouter.get('/getallusers/:id' ,getUserById)

userRouter.post('/add' , addUsers)

userRouter.put('/update/:id' , updateUsersById)

userRouter.delete('/delete/:id' , deleteUsersById)


export default userRouter;