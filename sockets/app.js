const Express = require("express")()
const Http = require("http").Server(Express)
const Socketio = require("socket.io")(Http)

const position = {
    x: 200,
    y: 200
}

Http.listen(8000, () => {
    console.log("Listening at :8000...")
})

Socketio.on("connection", socket => {
    socket.on("change", data => {
      socket.emit("update", data)
        // switch(data) {
        //     case "left":
        //         position.x -= 5
        //         Socketio.emit("position", position)
        //         break
        //     case "right":
        //         position.x += 5
        //         Socketio.emit("position", position)
        //         break
        //     case "up":
        //         position.y -= 5
        //         Socketio.emit("position", position)
        //         break
        //     case "down":
        //         position.y += 5
        //         Socketio.emit("position", position)
        //         break
        // }
    })
})
