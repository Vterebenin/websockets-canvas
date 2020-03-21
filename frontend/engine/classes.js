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
    this.speed = 3
    this.velX = 0
    this.velY = 0
    this.keys = []
    this.gameField = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
    this.friction = 0.8
    this.gravity = 0.3
    this.jumping = false
  }

  update () {
    const {
      color, width, height, update, velX, speed,
      requestAnimationFrame, ctx, keys, friction, gravity
    } = this

    if (keys[38] || keys[32]) {
      // up arrow
      if (!this.jumping) {
        this.jumping = true
        this.velY = -this.speed * 2
      }
    }
    if (keys[39]) {
      if (velX < speed) {
        this.velX++
      }
    }
    if (keys[37]) {
      if (velX > -speed) {
        this.velX--
      }
    }

    this.velX *= friction
    this.velY += gravity

    this.position.x += this.velX
    this.position.y += this.velY

    if (this.position.x >= this.gameField.width - width) {
      this.position.x = this.gameField.width - width
    } else if (this.position.x <= 0) {
      this.position.x = 0
    }
    if (this.position.y >= this.gameField.height - height) {
      this.position.y = this.gameField.height - height
      this.jumping = false
    }

    ctx.clearRect(0, 0, this.gameField.width, this.gameField.height)
    ctx.fillStyle = color
    ctx.fillRect(this.position.x, this.position.y, width, height)
    requestAnimationFrame(update.bind(this))
  }
}

export const classes = {
  Block,
  Player
}
