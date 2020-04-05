const { Player, Map, Block, SpellBook, Spell } = require('./engine/classes')
const Express = require('express')()
const Http = require('http').Server(Express)
const Socketio = require('socket.io')(Http)

let players = {}

Http.listen(8000, () => {
    console.log('Listening at :8000...')
})

Socketio.on('connection', function (socket) {
  const { id } = socket
  players[id] = new Player({ id })
})
