import { gameField } from '@/engine/classes/gameField'

export class Updater {
  constructor (args) {
    this.player = args?.player
    this.blocks = args?.blocks || []
    this.keys = args?.keys || {}
    this.ctx = args?.ctx
    this.socket = args?.socket
    this.requestAnimationFrame = args?.requestAnimationFrame
  }

  update () {
    const { player, blocks, keys, ctx, requestAnimationFrame, update } = this
    this.socket.on('update', (data) => {
      console.log(data)
    })
    ctx.clearRect(0, 0, gameField.width, gameField.height)
    ctx.save()
    ctx.translate(gameField.width / 2 - player.position.x, gameField.height / 2 - player.position.y)

    player.handleKeys(keys, ctx)

    for (const block of blocks) {
      block.drawYourself(ctx)
      player.colCheck(block)
    }

    player.drawYourself(ctx)

    ctx.restore()
    this.socket.emit('change', { x: 20, y: 30 })
    requestAnimationFrame(update.bind(this))
  }
}
