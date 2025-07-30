import express from "express";

const app = express()

app.use(express.static("public"))

app.get("/", (req, res) => res.send("<h1>Hello world!!</h1>"))

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}/`)
})