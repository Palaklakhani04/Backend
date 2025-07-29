const fs = require("fs")
const path = require("path")

const fileName = "test.txt"
const filePath = path.join(__dirname , fileName)

// write in the file
const writeFile = fs.writeFileSync(filePath, "This is the initial Data" ,"utf-8")
console.log(writeFile)

// read's file content
const readFile = fs.readFileSync(filePath,"utf-8")
console.log(readFile)

// append data to the file
const appendFile = fs.appendFileSync(filePath, "\nThis is the updated Data" ,"utf-8")
console.log(appendFile) 

// deleteing file
const fileName1 = "text2.txt"
const writeFile1 = fs.writeFileSync(fileName1, "This is the initial Data for deleting" ,"utf-8")
console.log(writeFile1)
const deleteFile = fs.unlinkSync(fileName1);
console.log(deleteFile)

// rename the file name to another
const newFileName = "updatedTest.txt"
const newFilePath = path.join(__dirname , newFileName)
const renameFile = fs.renameSync(filePath ,newFilePath )
console.log(renameFile)