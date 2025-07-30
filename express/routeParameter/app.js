import express from "express"

const app = express()

//router Parameters
app.get("/profile/:username", (req, res) => {
    console.log(req.params);
    res.send(`<h1>My username is ${req.params.username}.</h1>`)
})

app.get("/profile/:username/article/:slug", (req, res) => {
    console.log(req.params)
    res.send(`<h1>Article ${req.params.username} by ${req.params.slug}.</h1>`)
})

//query Parameters
app.get("/product", (req, res) => {
    console.log(req.query);
    res.send(`<h1>User search for the product ${req.query.search}.</h1>`)
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("server rinning at http://localhost:3000/")
} )