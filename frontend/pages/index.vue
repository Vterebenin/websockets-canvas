<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
import io from 'socket.io-client'
import { initKeys } from '@/engine/helpers'
import { gameField } from '@/engine/classes/gameField'
import { Updater, Player, Block } from '@/engine/classes'

export default {
  data () {
    return {
      socket: null,
      clientPlayers: [],
      keys: {},
      updater: new Updater()
    }
  },
  created () {
    this.socket = io('http://localhost:8000')
    this.updater.socket = this.socket
  },
  mounted () {
    const canvas = this.$refs.game
    if (canvas.getContext) {
      this.updater.ctx = canvas.getContext('2d')
      canvas.width = gameField.width
      canvas.height = gameField.height
      initKeys(this.keys, this.socket)
      this.socket.on('currentPlayers', (players, id) => {
        for (const [_id, _player] of Object.entries(players)) {
          if (_id === id) {
            this.clientPlayers.push(new Player({ ..._player, isEnemy: false }))
          } else {
            this.clientPlayers.push(new Player({ ..._player, isEnemy: true }))
          }
        }
        this.updater.players = this.clientPlayers
      })
      this.socket.on('newPlayer', (players, id) => {
        this.clientPlayers.push(new Player({ ...players[id], isEnemy: true }))
        this.updater.players = this.clientPlayers
      })
      const blocks = []
      blocks.push(new Block({
        width: 300,
        height: 50,
        position: {
          x: 400,
          y: gameField.height - 50
        },
        color: 'pink'
      }))
      blocks.push(new Block({ width: 200, position: { x: 150, y: 200 }, color: 'red' }))
      blocks.push(new Block({ width: 500, position: { x: 200, y: 300 }, color: 'green' }))
      blocks.push(new Block({ width: 500, position: { x: 200, y: 300 }, color: 'black' }))
      this.updater.blocks = blocks
      this.updater.init()
    }
  }
}
</script>
