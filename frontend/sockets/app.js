const Express = require('express')()
const Http = require('http').Server(Express)
const Socketio = require('socket.io')(Http)

let players = {}

Http.listen(8000, () => {
    console.log('Listening at :8000...')
})

Socketio.on('connection', function (socket) {
  players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
  }
  // const attackSpell = new Spell({
  //   mechanic (player) {
  //     console.log('casted!', player.position, id)
  //   }
  // })
  // players[id].spellBook = new SpellBook({
  //   attackSpell,
  //   player: { ...players[id] }
  // })


  // socket.emit('setMap', map)
  socket.emit('currentPlayers', players)
  socket.broadcast.emit('newPlayer', players[socket.id])

  socket.on('playerMovement', ({ x, y }) => {
    players[socket.id].x = x
    players[socket.id].y = y
    socket.broadcast.emit('playerMoved', players[socket.id])
  })
  // socket.on(,'keyPressed', (keys, id) => {
  //   players[id] = players[id].handleKeys(keys)
  // })
  // setInterval(() => {
  //   if (players[id]) {
  //     players[id].handleMovements()
  //     for (const block of map.blocks) {
  //       if (block.solid) {
  //         players[id].colCheck(block)
  //       }
  //     }
  //   }
  //   socket.emit('update', players)
  // }, 1000 / 60)
  socket.on('disconnect', function () {
    delete players[socket.id]
    Socketio.emit('disconnect', socket.id)
  })
})
