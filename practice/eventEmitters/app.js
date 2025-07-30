const eventEmitters = require("events")

const emitters = new eventEmitters()

emitters.on("greet",(name) => {
    console.log(`hello, ${name}`)
})

emitters.emit("greet","good morning")