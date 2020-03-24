const Express = require("express")()
const Http = require("http").Server(Express)
const Socketio = require("socket.io")(Http)

Http.listen(8000, () => {
    console.log("Listening at :8000...")
})

Socketio.on("connection", socket => {
    socket.on("change", ({ player }) => {
      socket.emit("update", { position: player.position })
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
