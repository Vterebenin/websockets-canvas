export default class Block {
  constructor (props) {
    this.width = props.width || 100
    this.height = props.height || 100
    this.position = props.position || { x: 100, y: 100 }
    this.texture = props.texture || ''
    this.solid = props.solid || true
    this.isCollide = { onLeft: false, onRight: false, onBottom: false, onTop: false }
    this.color = props.color
  }
}
