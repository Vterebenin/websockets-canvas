'use strict'
const { colCheck } = require('../../helpers')
const gameField = require('./gameField')

class Player {
  constructor (props) {
    this.id = props.id || null
    this.width = props.width || 50
    this.height = props.height || 100
    this.position = props.position || {
      x: Math.floor(Math.random() * 500),
      y: 100
    }
    this.solid = props.solid || true
    this.health = props.health || 250
    this.speed = 6
    this.velX = 0
    this.velY = 0
    this.velSpeed = 15
    this.friction = 0.2
    this.isEnemy = Boolean(props.isEnemy)
    this.color = this.isEnemy ? 'red' : 'blue'
    this.gravity = 0.6
    this.jumping = false
    this.grounded = false
    this.moved = false
    this.socket = null
  }

  drawYourself (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
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

  set pos (obj) {
    const { x, y } = obj
    this.position.x = x
    this.position.y = y
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
        this.velX += this.velSpeed
      }
    }
    if (keys[37]) { // Кнопка <влево>
      this.moved = true
      if (this.velX > -this.speed) {
        this.velX -= this.velSpeed
      }
    }
    return this
  }

  handleMovements () {
    if (this.grounded) {
      this.velY = 0
    }

    this.grounded = false

    this.velX *= this.friction
    this.velY += this.gravity

    this.position.x += this.velX
    this.position.y += this.velY
    // const curX = this.position.x
    // const curY = this.position.y
    // this.position.x = this.interpolate(curX, curX + this.velX, 0.5)
    // this.position.y = this.interpolate(curY, curY + this.velY, 0.5)

    if (this.position.y >= gameField.height - this.height) {
      this.position.y = gameField.height - this.height
      this.jumping = false
    }

    return this
  }
}
module.exports = Player
