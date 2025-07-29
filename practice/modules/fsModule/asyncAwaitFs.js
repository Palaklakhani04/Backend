const fs = require("fs")
const path = require("path")

const fileName = "test4.txt"
const filePath = path.join(__dirname, fileName)
const file = __dirname

const readDir = async () => {
    try{
        const res = await fs.promises.readdir(file)
        console.log(res)
    }catch(error){
        console.log(error)
    }
}
readDir()

const writeFile = async () => {
    try{
        const res = await fs.promises.writeFile(filePath , "This is the initial data" ,"utf-8")
        console.log("file created")
    }catch(error){
        console.log(error)
    }
}
writeFile()

const readFile = async () => {
    try{
        const res = await fs.promises.readFile(filePath,"utf-8")
        console.log(res)
    }catch(error){
        console.log(error)
    }
}
readFile()

const appendFile = async () => {
    try{
        const res = await fs.promises.appendFile(filePath , "\nThis is the updated data" ,"utf-8")
        console.log("file updated")
    }catch(error){
        console.log(error)
    }
}
appendFile()

// const deleteFile = async () => {
//     try{
//         const res = await fs.promises.unlink(filePath)
//         console.log("file deleted")
//     }catch(error){
//         console.log(error)
//     }
// }
// deleteFile()