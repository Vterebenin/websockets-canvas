export class Block {
  constructor (args) {
    this.width = args?.width || 100
    this.height = args?.height || 100
    this.position = args?.position || { x: 100, y: 100 }
    this.texture = args?.texture || ''
    this.color = args?.color || 'red'
    this.solid = args?.solid || false
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
  constructor (props, args) {
    super(props)
    this.width = args?.width || 20
    this.height = args?.height || 20
    this.position = args?.position || {
      x: document.documentElement.clientWidth / 2,
      y: document.documentElement.clientHeight - this.height
    }
    this.health = args?.health || 250
  }
}

export const classes = {
  Block,
  Player
}
