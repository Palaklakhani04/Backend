import express from "express"
import { createCategories, deleteCategoriesById, getAllCategories, getCategoriesById, updateCategoriesById } from "../controllers/categories.js"

const router = express.Router()

router
    .route('/categories')
    .get(getAllCategories)
    .post(createCategories)

router
    .route('/categories/:id')
    .get(getCategoriesById)
    .put(updateCategoriesById)
    .delete(deleteCategoriesById)

export default router