import { gameField } from '@/engine/classes/gameField'
import { colCheck } from '@/engine/helpers'

export class Player {
  constructor (args) {
    this.id = args?.id || null
    this.width = args?.width || 20
    this.height = args?.height || 20
    this.position = args?.position || {
      x: gameField.width / 2,
      y: gameField.height - this.height
    }
    this.solid = args?.solid || true
    this.health = args?.health || 250
    this.speed = 8
    this.velX = 0
    this.velY = 0
    this.keys = args?.keys || []
    this.friction = 0.5
    this.gravity = 0.5
    this.isEnemy = Boolean(args?.isEnemy)
    this.color = this.isEnemy ? 'red' : 'blue'
    this.jumping = false
    this.grounded = false
    this.moved = false
    this.socket = null
    this.prevPosition = {}
  }

  set pos (obj) {
    this.position = obj
    this.socket.emit('setPosition', { id: this.socket.id, obj })
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

  handleKeys (keys) {
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
        this.velX += 5
      }
    }
    if (keys[37]) { // Кнопка <влево>
      this.moved = true
      if (this.velX > -this.speed) {
        this.velX -= 5
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
    const newPosition = {
      x: Math.round(this.position.x),
      y: Math.round(this.position.y)
    }
    if ((this.prevPosition.x !== newPosition.x) || (this.prevPosition.y !== newPosition.y)) {
      this.pos = newPosition
      this.prevPosition = newPosition
    }
    return this
  }
}
