import express from "express"

const app = express()

app.use(express.json())

let todos = [
    {
        "id" : 1,
        "task": "t1",
        "completed": false
    },
    {
        "id" : 2,
        "task": "t2",
        "completed": false
    },
    {
        "id" : 3,
        "task": "t3",
        "completed": false
    }
]

const PORT = 3000

app.get("/todos", (req, res) => {
    res.json(todos)
})

app.get("/todos/:id" , (req, res) => {
    const taskId = Number(req.params.id)
    const data = todos.filter((todo) => todo.id === taskId)
    if (!data) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(data)
})

app.post("/todos" , (req, res) => {
    if(!req.body.task){
        return res.status(400).json({ message: 'Task is required' });
    }
    const newTask = {
        id:todos.length + 1,
        task:req.body.task,
        completed:false
    }
    todos.push(newTask)
    res.json(todos)
})

app.put("/todos/:id", (req, res) => {
    const taskId = Number(req.params.id)
    const dataIndex = todos.findIndex((i) => i.id === taskId)
    if(dataIndex != -1) {
        todos[dataIndex] = { 
            ...todos[dataIndex],
            ...req.body
        }
        res.json(todos)
    }
})

app.delete("/todos/:id" , (req, res) => {
    const taskId = Number(req.params.id)
    const dataIndex = todos.findIndex((i) => i.id === taskId)
    todos.splice(dataIndex, 1)
    res.json(todos)
})


app.listen(PORT, () => {
    console.log(`server running at port: ${PORT}`)
})