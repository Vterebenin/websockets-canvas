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
  }
}
