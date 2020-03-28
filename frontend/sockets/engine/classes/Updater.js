'use strict'
const gameField = require('./gameField')

class Updater {
  constructor (props) {
    this.players = []
    this.blocks = []
    this.map = null
    this.keys = {}
    this.ctx = undefined
    this.socket = null
  }

  draw (entity) {
    this.ctx.fillStyle = entity.color
    this.ctx.fillRect(entity.position.x, entity.position.y, entity.width, entity.height)
  }

  updatePlayersData (playersData) {
    for (const [_id, _player] of Object.entries(playersData)) {
      const curPlayer = this.players.find(el => el.id === _id)
      for (const [prop, value] of Object.entries(_player)) {
        if (prop === 'position') {
          curPlayer.pos = value
        } else if (!['isEnemy', 'color'].includes(prop)) {
          curPlayer[prop] = value
        }
      }
    }
  }

  streamDrawing () {
    for (const block of this.map.blocks) {
      this.draw(block)
    }

    for (const player of this.players) {
      this.draw(player)
    }
  }

  initCamera () {
    const { ctx, players, socket } = this
    const player = players.find(el => el.id === socket.id)
    ctx.translate(gameField.width / 2 - player.position.x, gameField.height / 2 - player.position.y)
  }

  streamStart () {
    const { ctx } = this
    ctx.clearRect(0, 0, gameField.width, gameField.height)
    ctx.save()
  }

  streamEnd () {
    this.ctx.restore()
  }

  update (playersData) {
    this.streamStart()
    this.initCamera()
    this.updatePlayersData(playersData)
    this.streamDrawing()
    this.streamEnd()
  }

  init () {
    this.socket.on('update', (playersData) => {
      this.socket.emit('keyPressed', this.keys, this.socket.id)
      this.update(playersData)
    })
  }
}

module.exports = Updater
