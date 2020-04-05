export default class Map {
  constructor (props) {
    this.blocks = []
    this.name = props.name
    this.gameField = {
      width: 1920,
      height: 1080
    }
    this.tilemap = props.tilemap
  }
}
