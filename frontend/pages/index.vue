<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
import { initKeys } from '@/sockets/helpers'
import Updater from '~/sockets/engine/classes/Updater'
import Map from '~/sockets/engine/classes/Map'
import Block from '~/sockets/engine/classes/Block'
import Player from '~/sockets/engine/classes/Player'
import BlindForest from '~/static/maps/blindForest.json'

export default {
  data () {
    return {
      socket: null,
      clientPlayers: [],
      keys: {},
      updater: new Updater()
    }
  },
  mounted () {
    const canvas = this.$refs.game
    if (canvas.getContext) {
      this.updater.ctx = canvas.getContext('2d')

      initKeys(this.keys)
      this.updater.keys = this.keys

      this.handleSetMap(canvas)
      this.updater.player = new Player()
      this.updater.init()
    }
  },
  methods: {
    handleSetMap (canvas) {
      const map = new Map({ name: 'Blind forest', tileMap: BlindForest })
      map.blocks.push(new Block({
        width: 300,
        height: 50,
        position: { x: 400, y: map.gameField.height - 50 },
        color: 'pink'
      }))
      map.blocks.push(new Block({ width: 200, position: { x: 150, y: map.gameField.height - 100 }, color: 'red' }))
      map.blocks.push(new Block({ width: 500, position: { x: 200, y: 300 }, color: 'green' }))
      map.blocks.push(new Block({ width: 500, position: { x: 200, y: 300 }, color: 'black' }))

      canvas.width = map.gameField.width
      canvas.height = map.gameField.height
      this.updater.map = map
    }
  }
}
</script>
