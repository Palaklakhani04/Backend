const eventEmitters = require("events")

const emitters = new eventEmitters()

const eventsCount = {
    "user-login" : 0,
    "user-logout": 0,
    "user-purchase": 0,
    "profile-update": 0
}

emitters.on("user-login", (user) => {
    eventsCount["user-login"]++
    console.log(`${user} login`)
})

emitters.on("user-logout", (user) => {
    eventsCount["user-logout"]++
    console.log(`${user} logout`)
})

emitters.on("user-purchase", (user, item) => {
    eventsCount["user-purchase"]++
    console.log(`${user} Purchase the ${item}`)
})

emitters.on("profile-update", (user , email) => {
    eventsCount["profile-update"]++
    console.log(`${user} profile update with ${email}`)
})

emitters.on("summary", () => {
    console.log(eventsCount)
})

emitters.emit("user-login", "john")
// emitters.emit("user-login", "john")
emitters.emit("user-logout", "john")
emitters.emit("user-purchase", "john", "bag")
emitters.emit("profile-update", "john" , "winn")
emitters.emit("summary")