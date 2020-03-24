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

  isPositionChanged (prev, next) {
    return (prev.position.x !== next.position.x) || (prev.position.y !== next.position.y)
  }

  update () {
    const { player, blocks, keys, ctx, socket } = this
    ctx.clearRect(0, 0, gameField.width, gameField.height)
    ctx.save()
    ctx.translate(gameField.width / 2 - player.position.x, gameField.height / 2 - player.position.y)
    player.handleKeys(keys, socket)

    for (const block of blocks) {
      block.drawYourself(ctx)
      player.colCheck(block)
    }

    player.drawYourself(ctx)
    ctx.restore()
  }
}
