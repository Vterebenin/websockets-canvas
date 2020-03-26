"use strict"

const gameField = require('./gameField')

class Player {
  constructor(props) {
    this.id = props.id || null
    this.position = props.position || {
      x: Math.floor(Math.random() * 500),
      y: 100
    }
    this.width = props.width || 20
    this.height = props.height || 20
    this.speed = 3
    this.velX = 0
    this.velY = 0
    this.friction = 0.7
    this.gravity = 0.2
    this.jumping = false
    this.grounded = false
    this.moved = false
  }

  interpolate (start, stop, amt) {
    return amt * (stop - start) + start
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
        this.velX++
      }
    }
    if (keys[37]) { // Кнопка <влево>
      this.moved = true
      if (this.velX > -this.speed) {
        this.velX--
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