'use strict'
const gameField = require('./gameField')

class Updater {
  constructor (args) {
    this.players = args?.players || []
    this.blocks = args?.blocks || []
    this.keys = args?.keys || {}
    this.ctx = args?.ctx
    this.enemies = args?.enemies || {}
    this.socket = args?.socket
    this.requestAnimationFrame = args?.requestAnimationFrame
  }

  update (playersData) {
    const {
      blocks,
      // keys,
      ctx,
      players,
      socket
    } = this
    ctx.clearRect(0, 0, gameField.width, gameField.height)
    ctx.save()
    const player = players.find(el => el.id === socket.id)
    ctx.translate(gameField.width / 2 - player.position.x, gameField.height / 2 - player.position.y)

    // player.handleKeys()

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
    for (const block of blocks) {
      block.drawYourself(ctx)
      player.colCheck(block)
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
