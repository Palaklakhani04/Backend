import { categorieSchema } from "../middleware/Validation.js"
import Categorie from "../models/categoriesModel.js"

export async function getAllCategories(req, res){
    try {
        const categorie = await Categorie.findAll({})
        if(!categorie) return res.status(404).json([])
        return res.status(200).json(categorie)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function getCategoriesById(req, res){
    try {
        const categorieId = req.params.id
        const categorie = await Categorie.findOne({
            where:{
                id: categorieId,
            }
        })
        if(!categorie) return res.status(404).json({msg : "categorie not found"})
        return res.status(200).json(categorie)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function createCategories(req, res){
    try {
        const {error} = categorieSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const { name } = req.body
        const newCategories = await Categorie.create({ name })
        return res.status(201).json(newCategories)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function updateCategoriesById(req, res){
    try {
        const {error} = categorieSchema.validate(req.body)
        if(error) return res.status(400).json({ message : error.details[0].message})

        const categorieId = req.params.id
        const categorie = await Categorie.findOne({
            where:{
                id: categorieId
            }
        })
        if(!categorie) return res.status(404).json({msg : "categorie not found"})
        await categorie.update(req.body)
        return res.status(200).json({message : 'categorie Updated'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}

export async function deleteCategoriesById(req, res){
    try {
        const categorieId = req.params.id
        const categorie = await Categorie.findOne({
            where:{
                id: categorieId,
            }
        })
        if(!categorie) return res.status(404).json({msg : "categorie not found"})
        await categorie.destroy()
        return res.status(200).json({message : 'categorie deleted'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error : error.message})
    }
}