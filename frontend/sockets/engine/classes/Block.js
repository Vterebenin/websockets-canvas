'use strict'

class Block {
  constructor (props) {
    this.width = props.width || 100
    this.height = props.height || 100
    this.position = props.position || { x: 100, y: 100 }
    this.texture = props.texture || ''
    this.color = props.color
  }

  drawYourself (ctx, socket) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

module.exports = Block
