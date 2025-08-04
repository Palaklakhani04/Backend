import express from "express"
import { getAllBooks, getBookByCondition, updateBookByCondition, deleteBookByCondition } from "../controllers/books.js"

export const router = express.Router()

router.get("/",getAllBooks)

router
    .route("/:condition")
    .get(getBookByCondition)
    .put(updateBookByCondition)
    .delete(deleteBookByCondition)
    
