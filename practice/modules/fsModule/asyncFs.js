const fs = require("fs")
const path = require("path")

const fileName = "test2.txt"
const filePath = path.join(__dirname, fileName)

const writeFile = fs.writeFile(filePath, "This is the initial data", 'utf-8' ,(err) =>{
        if(err) console.log(err)
        else console.log("saved data")
    }
)

const readFile = fs.readFile(filePath,"utf-8" ,(err, data) =>{
        if(err) console.log(err)
        else console.log(data)
    }
)

const appendFile = fs.appendFile(filePath, "\nThis is the updated data", 'utf-8' ,(err) =>{
        if(err) console.log(err)
        else console.log("updated data")
    }
)

// const deleteFile = fs.unlink(filePath, (err) => {
//     if(err) console.log(err)
//     else console.log("file delete")
// })