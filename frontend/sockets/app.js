const Player = require("./engine/classes/Player")
const Express = require("express")()
const Http = require("http").Server(Express)
const Socketio = require("socket.io")(Http)

let players = {}

Http.listen(8000, () => {
    console.log("Listening at :8000...")
})

Socketio.on('connection', function (socket) {
  const { id } = socket
  players[id] = new Player({ id })

  socket.emit('currentPlayers', players, id)
  socket.broadcast.emit('newPlayer', players, id)

  socket.on('keyPressed', (keys, id) => {
    players[id] = players[id].handleKeys(keys)
  })
  setInterval(() => {
    for (const id in players) {
      players[id].handleMovements()
    }
    socket.emit('update', players)
  }, 1000 / 60)
  socket.on('disconnect', function () {
    delete players[socket.id]
    Socketio.emit('disconnect', socket.id)
  })
})
