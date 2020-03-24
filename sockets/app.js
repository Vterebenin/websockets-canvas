const Express = require("express")()
const Http = require("http").Server(Express)
const Socketio = require("socket.io")(Http)

let players = {}

Http.listen(8000, () => {
    console.log("Listening at :8000...")
})

Socketio.on('connection', function (socket) {
  players[socket.id] = ''
  socket.emit('currentPlayers', players);
  socket.broadcast.emit('newPlayer', players[socket.id])
  console.log('user connected')
  console.log(players)
  setInterval(() => {
    socket.emit('update', socket.id)
  }, 1000 / 60)
  socket.on('disconnect', function () {
    delete players[socket.id]
    console.log('user disconnected')
    console.log(players)
    Socketio.emit('disconnect', socket.id)
  });
});
