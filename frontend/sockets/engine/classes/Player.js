class Player {
  constructor(props) {
    this.id = props.id || null
    this.position = props.position || {
      x: Math.floor(Math.random() * 500),
      y: 100
    }
    this.width = props.width || 20
    this.height = props.height || 20
  }
}
module.exports = Player