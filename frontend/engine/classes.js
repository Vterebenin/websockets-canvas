export const gameField = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight
}

export class Block {
  constructor (args) {
    this.width = args?.width || 100
    this.height = args?.height || 100
    this.position = args?.position || { x: 100, y: 100 }
    this.texture = args?.texture || ''
    this.color = args?.color
    this.ctx = args?.ctx || null
    this.requestAnimationFrame = args?.requestAnimationFrame || null
  }

  update () {
    const { ctx, color, width, height, update } = this
    ctx.clearRect(0, 0, gameField.width, gameField.height)
    ctx.fillStyle = color
    ctx.fillRect(this.position.x, this.position.y, width, height)
    requestAnimationFrame(update.bind(this))
  }

  draw (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

export class Player {
  constructor (args) {
    this.width = args?.width || 20
    this.height = args?.height || 20
    this.position = args?.position || {
      x: gameField.width / 2,
      y: gameField.height - this.height
    }
    this.color = args?.color || 'red'
    this.solid = args?.solid || true
    this.ctx = args?.ctx || null
    this.requestAnimationFrame = args?.requestAnimationFrame || null
    this.health = args?.health || 250
    this.speed = 3
    this.velX = 0
    this.velY = 0
    this.keys = args?.keys || []
    this.friction = 0.8
    this.gravity = 0.3
    this.jumping = false
  }
}

export class Updater {
  constructor (args) {
    this.player = args?.player
    this.blocks = args?.blocks || []
    this.keys = args?.keys || {}
    this.ctx = args?.ctx
    this.requestAnimationFrame = args?.requestAnimationFrame
  }

  update () {
    const { player, blocks, keys, ctx, requestAnimationFrame, update } = this

    if (keys[38] || keys[32]) {
      // up arrow
      if (!player.jumping) {
        player.jumping = true
        player.velY = -player.speed * 2
      }
    }
    if (keys[39]) {
      if (player.velX < player.speed) {
        player.velX++
      }
    }
    if (keys[37]) {
      if (player.velX > -player.speed) {
        player.velX--
      }
    }

    ctx.clearRect(0, 0, gameField.width, gameField.height)

    for (const block of blocks) {
      block.draw(ctx)
    }

    // Player
    // TODO: Вынести в функции плеера?
    player.velX *= player.friction
    player.velY += player.gravity

    player.position.x += player.velX
    player.position.y += player.velY

    if (player.position.x >= gameField.width - player.width) {
      player.position.x = gameField.width - player.width
    } else if (player.position.x <= 0) {
      player.position.x = 0
    }
    if (player.position.y >= gameField.height - player.height) {
      player.position.y = gameField.height - player.height
      player.jumping = false
    }

    ctx.fillStyle = player.color
    ctx.fillRect(player.position.x, player.position.y, player.width, player.height)
    requestAnimationFrame(update.bind(this))
  }
}

export const classes = {
  Block,
  Player
}
