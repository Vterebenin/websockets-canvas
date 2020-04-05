import gameField from './gameField'
import { colCheck } from '@/sockets/helpers'

export default class Updater {
  constructor () {
    this.player = null
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

  streamDrawing () {
    for (const block of this.map.blocks) {
      this.draw(block)
    }

    this.draw(this.player)
  }

  initCamera () {
    const { ctx, player } = this
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

  update () {
    this.streamStart()
    this.initCamera()

    this.player.handleKeys(this.keys)
    this.player.handleMovements()
    for (const block of this.map.blocks) {
      const [playerCollide, blockCollide] = colCheck(this.player, block)
      this.player.isCollide = playerCollide
      this.player.colCheck()
      block.isCollide = blockCollide
    }
    this.streamDrawing()
    this.streamEnd()
    requestAnimationFrame(this.update.bind(this))
  }

  init () {
    this.update()
  }
}
