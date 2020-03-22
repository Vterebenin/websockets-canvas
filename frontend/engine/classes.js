import { colCheck } from '@/engine/updater'

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

  drawYourself (ctx) {
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
    this.grounded = false
    this.moved = false
  }

  colCheck (block) {
    // Функция проверки колижена игрока и блока
    const dir = colCheck(this, block)
    if (dir === 'l' || dir === 'r') {
      this.velX = 0
      // this.jumping = false
    } else if (dir === 'b') {
      this.grounded = true
      this.jumping = false
    } else if (dir === 't') {
      this.velY *= -1
    }
  }

  drawYourself (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  handleKeys (keys, ctx) {
    this.moved = false

    if (keys[38] || keys[32]) { // Прыжок <пробел> или <вверх>
      // up arrow
      this.moved = true
      if (!this.jumping) {
        this.jumping = true
        this.grounded = false
        this.velY = -this.speed * 2
      }
    }
    if (keys[39]) { // Кнопка <вправо>
      this.moved = true
      if (this.velX < this.speed) {
        this.velX++
      }
    }
    if (keys[37]) { // Кнопка <влево>
      this.moved = true
      if (this.velX > -this.speed) {
        this.velX--
      }
    }

    if (this.grounded) {
      this.velY = 0
    }

    this.grounded = false

    // if (this.moved) {
    //   ctx.translate(-this.velX, -this.velY)
    // }
    this.velX *= this.friction
    this.velY += this.gravity

    this.position.x += this.velX
    this.position.y += this.velY

    if (this.position.y >= gameField.height - this.height) {
      this.position.y = gameField.height - this.height
      this.jumping = false
    }
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
    requestAnimationFrame(update.bind(this))
  }
}

export const classes = {
  Block,
  Player
}
