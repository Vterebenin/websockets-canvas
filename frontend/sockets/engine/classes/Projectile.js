export default class Projectile {
  constructor (props) {
    // this.speed = 5
    // this.direction = 90
    this.velX = 1
    this.velY = 1
    this.color = 'green'
    this.friction = 0.3
    this.position = { x: 0, y: 0 }
  }

  handleShoot () {
    this.velX *= this.friction

    this.position.x += this.velX
    this.position.y += this.velY
  }
}
