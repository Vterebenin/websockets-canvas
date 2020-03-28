<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
import io from 'socket.io-client'
import { initKeys } from '@/sockets/helpers'
import { Updater, gameField, Player } from '@/sockets/engine/classes'

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
      initKeys(this.keys)
      this.updater.keys = this.keys
      this.socket.on('setMap', (map) => {
        this.updater.map = map
      })
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
      this.updater.init()
    }
  }
}
</script>
