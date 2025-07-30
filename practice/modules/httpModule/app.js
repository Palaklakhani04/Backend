const http = require("http")

const server = http.createServer((req, res) => {
    if(req.url === "/"){
        res.setHeader("Content-Type", "text/html")
        res.write("<h1>This is Home Page</h1>")
        res.end()
    }
    if(req.url === "/contact"){
        res.setHeader("Content-Type", "text/plain")
        res.write("This is contact Page")
        res.end()
    }
    if(req.url === "/about"){
        res.setHeader("Content-Type", "text/html")
        res.write("<h1>This is about Page</h1>")
        res.end()
    }
})

const PORT = 3000;
server.listen(PORT,() => {
    console.log("server rinning at http://localhost:3000/")
})