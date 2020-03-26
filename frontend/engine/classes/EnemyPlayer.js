import { gameField } from '@/engine/classes/gameField'

export class EnemyPlayer {
  constructor (args) {
    this.width = args?.width || 20
    this.height = args?.height || 20
    this.position = args?.position || {
      x: gameField.width / 2,
      y: gameField.height - this.height
    }
    this.color = args?.color || 'blue'
    this.solid = args?.solid || true
    this.health = args?.health || 250
    this.id = args?.id || null
  }

  set pos (obj) {
    this.position = obj
    if (this.id !== null) {
      this.socket.emit('setPosition', { id: this.id, obj })
    }
  }

  trackPosition (socket) {
    socket.on('enemyPlayerMove', (obj) => {
      // console.log(this.id, players, 'inside enemy')
      this.pos = obj
    })
  }

  drawYourself (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
