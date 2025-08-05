import express from "express"
import { getAllBooks, getBookByCondition, updateBookByCondition, deleteBookByCondition } from "../controllers/books.js"

export const bookRouter = express.Router()

bookRouter.get("/",getAllBooks)

bookRouter
    .route("/:condition")
    .get(getBookByCondition)
    .put(updateBookByCondition)
    .delete(deleteBookByCondition)
    
