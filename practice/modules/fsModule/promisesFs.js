const fs = require("fs")
const path = require("path")

const fileName = "test3.txt"
const filePath = path.join(__dirname , fileName)

const file = __dirname

fs.promises.readdir(file).then((data)=> console.log(data)).catch((err) => console.error(err))

fs.promises.writeFile(filePath, "This is the initial data" ,"utf-8").then(console.log("file created")).catch((err) => console.error(err))

fs.promises.readFile(filePath, "utf-8").then((data) => console.log(data)).catch((err) => console.error(err))

fs.promises.appendFile(filePath, "\nThis is the updated data" ,"utf-8").then(console.log("file updated")).catch((err) => console.error(err))

// fs.promises.unlink(filePath,).then(console.log("file deleted")).catch((err) => console.error(err))

