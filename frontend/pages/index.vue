<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
import io from 'socket.io-client'
import { initKeys } from '@/sockets/helpers'
import { Updater, Player } from '@/sockets/engine/classes'

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

      initKeys(this.keys)
      this.updater.keys = this.keys

      this.socket.on('setMap', (map) => {
        this.handleSetMap(canvas, map)
      })
      this.socket.on('currentPlayers', (players, id) => {
        this.handleCurrentPlayers(players, id)
      })
      this.socket.on('newPlayer', (players, id) => {
        this.handleNewPlayers(players, id)
      })
      this.socket.on('disconnect', (id) => {
        this.handleDisconnect(id)
      })
      this.updater.init()
    }
  },
  methods: {
    handleCurrentPlayers (players, id) {
      for (const [_id, _player] of Object.entries(players)) {
        if (_id === id) {
          this.clientPlayers.push(new Player({ ..._player, isEnemy: false }))
        } else {
          this.clientPlayers.push(new Player({ ..._player, isEnemy: true }))
        }
      }
      this.updater.players = this.clientPlayers
    },
    handleNewPlayers (players, id) {
      this.clientPlayers.push(new Player({ ...players[id], isEnemy: true }))
      this.updater.players = this.clientPlayers
    },
    handleDisconnect (id) {
      this.clientPlayers.filter(el => el.id !== id)
      this.updater.players = this.clientPlayers
    },
    handleSetMap (canvas, map) {
      canvas.width = map.gameField.width
      canvas.height = map.gameField.height
      this.updater.map = map
    }
  }
}
</script>
