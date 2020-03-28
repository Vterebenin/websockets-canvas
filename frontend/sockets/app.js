const { Player, Map, Block } = require('./engine/classes')
const Express = require('express')()
const Http = require('http').Server(Express)
const Socketio = require('socket.io')(Http)

let players = {}

Http.listen(8000, () => {
    console.log('Listening at :8000...')
})
const map = new Map({ name: 'Blind forest' })
map.blocks.push(new Block({
  width: 300,
  height: 50,
  position: { x: 400, y: map.gameField.height - 50 },
  color: 'pink'
}))
map.blocks.push(new Block({ width: 200, position: { x: 150, y: map.gameField.height - 100 }, color: 'red' }))
map.blocks.push(new Block({ width: 500, position: { x: 200, y: 300 }, color: 'green' }))
map.blocks.push(new Block({ width: 500, position: { x: 200, y: 300 }, color: 'black' }))

Socketio.on('connection', function (socket) {
  const { id } = socket
  players[id] = new Player({ id })
  socket.emit('setMap', map)
  socket.emit('currentPlayers', players, id, map)
  socket.broadcast.emit('newPlayer', players, id)

  socket.on('keyPressed', (keys, id) => {
    players[id] = players[id].handleKeys(keys)
  })
  setInterval(() => {
    if (players[id]) {
      players[id].handleMovements()
      for (const block of map.blocks) {
        if (block.solid) {
          players[id].colCheck(block)
        }
      }
    }
    socket.emit('update', players)
  }, 1000 / 60)
  socket.on('disconnect', function () {
    delete players[socket.id]
    Socketio.emit('disconnect', socket.id)
  })
})
