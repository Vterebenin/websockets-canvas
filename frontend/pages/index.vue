<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
// import io from 'socket.io-client'
import ph from 'phaser'
// import { initKeys } from '@/sockets/helpers'
import { Updater, Player, Map } from '@/sockets/engine/classes'

export default {
  data () {
    return {
      socket: null,
      clientPlayers: [],
      keys: {},
      map: new Map('Blind forest'),
      updater: new Updater()
    }
  },
  created () {
    // this.socket = io('http://localhost:8000')
    // this.updater.socket = this.socket
  },
  mounted () {
    const { map: { gameField } } = this
    const canvas = document.getElementById('game')
    const config = {
      type: ph,
      width: gameField.width,
      height: gameField.height,
      canvas,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: {
        preload,
        create,
        update: this.update
      }
    }
    const game = new ph.Game(config)

    function preload () {
      this.load.image('background', '/assets/swamplands/2 Background/Background.png')
      this.load.tilemapTiledJSON('map', '/tileMaps/json/testmap.json')
      this.load.image('Tileset', '/assets/swamplands/1 Tiles/Tileset.png')
      this.load.image('player', '/assets/characters/2 GraveRobber/GraveRobber.png')
      // this.load.image('ground', 'src/games/firstgame/assets/platform.png')
      // this.load.image('star', 'src/games/firstgame/assets/star.png')
      // this.load.image('bomb', 'src/games/firstgame/assets/bomb.png')
      // this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 })
    }

    function create () {
      // const bg = this.add.image(gameField.width / 2, gameField.height / 2, 'background')
      // const player = this.add.image(gameField.width / 2, gameField.height / 2, 'player')
      // bg.displayWidth = gameField.width
      // bg.displayHeight = gameField.height

      this.map = this.add.tilemap('map')

      const TileSet = this.map.addTilesetImage('Tileset', 'Tileset')

      this.backgroundLayer = this.map.createStaticLayer('Слой тайлов 1', TileSet)
      this.player = this.physics.add.sprite(gameField.width / 2, gameField.height / 2, 'player')
      this.backgroundLayer.setCollisionBetween(1, 50)
      this.physics.add.collider(this.player, this.backgroundLayer)
      this.cursors = this.input.keyboard.createCursorKeys()
      console.log(this.cursors)
    }

    console.log(game)

    // const canvas = this.$refs.game
    // if (canvas.getContext) {
    //   this.updater.ctx = canvas.getContext('2d')
    //
    //   initKeys(this.keys)
    //   this.updater.keys = this.keys
    //
    //   this.socket.on('setMap', (map) => {
    //     this.handleSetMap(canvas, map)
    //   })
    //   this.socket.on('currentPlayers', (players, id) => {
    //     this.handleCurrentPlayers(players, id)
    //   })
    //   this.socket.on('newPlayer', (players, id) => {
    //     this.handleNewPlayers(players, id)
    //   })
    //   this.socket.on('disconnect', (id) => {
    //     this.handleDisconnect(id)
    //   })
    //   this.updater.init()
    // }
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
    },
    create () {
    },
    update () {
    }
  }
}
</script>
