import express  from "express"
import { addUsers, deleteUsersById, getAllUsers, getUserById, insert, updateUsersById } from "../controllers/user.js";

const userRouter = express.Router()

userRouter.get('/', insert)

userRouter.get('/getallusers', getAllUsers)

userRouter.get('/getallusers/:id' ,getUserById)

userRouter.post('/add' , addUsers)

userRouter.put('/update/:id' , updateUsersById)

userRouter.delete('/delete/:id' , deleteUsersById)


export default userRouter;