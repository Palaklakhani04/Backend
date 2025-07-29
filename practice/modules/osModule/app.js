const os = require("os");

console.log("Platform: " ,os.platform());

console.log("User: ", os.userInfo());

console.log("CPU Architecture: " ,os.arch());

console.log("Free Memory: ", os.freemem(), "bytes");

console.log("Total Memory: ", os.totalmem(),  "bytes");

console.log("System Uptime: ", os.uptime());

console.log("Home Directory: ", os.homedir());

console.log("CPU Info: ", os.cpus());

console.log("Host Name: ", os.hostname());

console.log("Network Interface: ", os.networkInterfaces());
 
console.log("Operating System: ", os.type());