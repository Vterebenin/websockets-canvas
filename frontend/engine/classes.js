export class Block {
  constructor (args) {
    this.width = args?.width || 100
    this.height = args?.height || 100
    this.position = args?.position || { x: 100, y: 100 }
    this.texture = args?.texture || ''
    this.color = args?.color || 'red'
    this.solid = args?.solid || true
  }

  get style () {
    const { height, width, position, color } = this
    return `
      height: ${height}px; 
      width: ${width}px; 
      position: absolute; 
      bottom: ${position.y}px; 
      left: ${position.x}px;
      background: ${color};
    `
  }
}

export class Player extends Block {
  constructor (args) {
    super()
    this.width = args?.width || 20
    this.height = args?.height || 20
    this.position = args?.position || {
      x: document.documentElement.clientWidth / 2,
      y: document.documentElement.clientHeight - this.height
    }
    this.ctx = null
    this.requestAnimationFrame = null
    this.health = args?.health || 250
  }

  update () {
    const {
      color, position: { x, y },
      width, height, update,
      requestAnimationFrame, ctx
    } = this
    // console.log(color, '123qwe')
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
    requestAnimationFrame(update.bind(this))
  }
}

export const classes = {
  Block,
  Player
}
