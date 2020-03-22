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
