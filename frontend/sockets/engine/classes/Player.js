import gameField from './gameField'

export default class Player {
  constructor (props) {
    this.width = props?.width || 50
    this.height = props?.height || 100
    this.position = props?.position || {
      x: Math.floor(Math.random() * 500),
      y: 100
    }
    this.solid = props?.solid || true
    this.health = props?.health || 250
    this.speed = 6
    this.velX = 0
    this.velY = 0
    this.velSpeed = 15
    this.friction = 0.2
    this.isEnemy = Boolean(props?.isEnemy)
    this.color = this.isEnemy ? 'red' : 'blue'
    this.gravity = 0.6
    this.jumping = false
    this.grounded = false
    this.moved = false
    this.socket = null
    this.isCollide = { onLeft: false, onRight: false, onBottom: false, onTop: false }
    this.spellBook = null
  }

  drawYourself (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  set pos (obj) {
    const { x, y } = obj
    this.position.x = x
    this.position.y = y
  }

  handleKeys (keys) {
    this.moved = false

    if (keys[87] || keys[32]) { // Прыжок <пробел> или <вверх>
      // up arrow
      this.moved = true
      if (!this.jumping) {
        this.jumping = true
        this.grounded = false
        this.velY = -this.speed * 2
      }
    }
    if (keys[68]) { // Кнопка <вправо>
      this.moved = true
      if (this.velX < this.speed) {
        this.velX += this.velSpeed
      }
    }
    if (keys[65]) { // Кнопка <влево>
      this.moved = true
      if (this.velX > -this.speed) {
        this.velX -= this.velSpeed
      }
    }

    if (keys[76]) { // кнопка атакующей способности <L>
      this.spellBook.castAttackSpell()
    }
  }

  colCheck () {
    const { isCollide } = this
    if (isCollide.onLeft || isCollide.onRight) {
      this.velX = 0
      // this.jumping = false
    } else if (isCollide.onBottom) {
      this.grounded = true
      this.jumping = false
    } else if (isCollide.onTop) {
      this.velY *= -1
    }
  }

  handleMovements () {
    // rest movements
    if (this.grounded) {
      this.velY = 0
    }

    this.grounded = false

    this.velX *= this.friction
    this.velY += this.gravity

    this.position.x += this.velX
    this.position.y += this.velY

    if (this.position.y >= gameField.height - this.height) {
      this.position.y = gameField.height - this.height
      this.jumping = false
    }

    return this
  }
}
