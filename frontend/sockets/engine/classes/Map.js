export default class Map {
  constructor (props) {
    this.blocks = []
    this.name = props.name
    this.gameField = {
      width: 1920,
      height: 1080
    }
    this.ctx = null
    this.tileMap = props.tileMap
    this.tilesets = []
  }

  parseTileMap () {
    for (const tileset of this.tileMap.tilesets) {
      const { image: src, imageheight, imagewidth, tilewidth, tileheight } = tileset
      const tile = new Image(tilewidth, tileheight)
      tile.src = src
      const columns = imagewidth / tilewidth
      const rows = imageheight / tileheight
      const tileSetObj = {
        id: tileset.firstgid,
        tileData: {}
      }
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          const tileParameters = {
            image: tile,
            sx: 32 * i,
            sy: 32 * j,
            sWidth: tilewidth,
            sHeight: tileheight,
            dWidth: tilewidth,
            dHeight: tileheight
          }
          const tileNumber = j * columns + i + 1
          tileSetObj.tileData[tileNumber] = tileParameters
          // this.ctx.drawImage(...Object.values(imageParameters))
        }
      }
      this.tilesets.push(tileSetObj)
    }
  }
}
