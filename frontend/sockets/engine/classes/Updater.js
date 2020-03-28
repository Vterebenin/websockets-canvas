'use strict'
const gameField = require('./gameField')
const Block = require('./Block')

class Updater {
  constructor (props) {
    this.players = []
    this.blocks = []
    this.map = null
    this.keys = {}
    this.ctx = undefined
    this.socket = null
  }

  update (playersData) {
    const {
      // keys,
      map,
      ctx,
      players,
      socket
    } = this
    ctx.clearRect(0, 0, gameField.width, gameField.height)
    ctx.save()
    const player = players.find(el => el.id === socket.id)
    ctx.translate(gameField.width / 2 - player.position.x, gameField.height / 2 - player.position.y)

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
    for (const mapBlock of map.blocks) {
      const block = new Block({ ...mapBlock })
      block.drawYourself(ctx)
    }

    for (const _player of players) {
      if (_player.id !== socket.id) {
        _player.drawYourself(ctx)
      } else {
        player.drawYourself(ctx)
      }
    }

    ctx.restore()
  }

  init () {
    this.socket.on('update', (playersData) => {
      this.socket.emit('keyPressed', this.keys, this.socket.id)
      this.update(playersData)
    })
  }
}

module.exports = Updater
