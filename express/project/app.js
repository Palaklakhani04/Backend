
import express from "express"
import fs from "fs"

const app = express()

app.use(express.json())

const values = fs.readFileSync("Data.json", "utf-8") 
const data = JSON.parse(values)

const saveData = (res) => {
    fs.promises.writeFile('Data.json', JSON.stringify(data), "utf-8")
    .then(() => {
            return res.status(201).json("data successfuly updated")
        }
    )
    .catch((error)=> console.error(error))
}

app.get("/items", (req ,res) => {
   fs.promises.readFile("Data.json", "utf-8")
   .then((data) => {
            console.log(data)
            return res.json(JSON.parse(data))
        }
    )
   .catch((err) => console.error(err))
   
})

app.post('/items' , (req , res) => {
    const newItem = {
        id:data.length + 1 ,
        name: req.body.name,
        price: req.body.price
    }
    data.push(newItem)
    saveData(res)
})

app.put('/items/:id', (req, res) => {
    const itemId = Number(req.params.id)
    const dataIndex = data.findIndex(i => i.id === itemId)
    if(dataIndex != -1){
        data[dataIndex] = {
            ...data[dataIndex],
            ...req.body
        }
        saveData(res)
    }
})

app.delete('/items/:id', (req, res) => {
    const itemId = Number(req.params.id)
    const dataIndex = data.findIndex(i => i.id === itemId)
    if(dataIndex != -1){
        data.splice(dataIndex, 1)
        saveData(res)
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log("server is running on localhost")
})