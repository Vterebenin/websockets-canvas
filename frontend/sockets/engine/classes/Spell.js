module.exports = class Spell {
  constructor (props) {
    this.coolDownTime = 5000
    this.isAvailable = true
    this.mechanic = props.mechanic
  }

  cast (player) {
    if (this.isAvailable) {
      this.isAvailable = false
      this.mechanic(player)
      setTimeout(() => {
        this.isAvailable = true
      }, this.coolDownTime)
    }
  }
}
