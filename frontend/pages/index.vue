<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
import io from 'socket.io-client'
import ph from 'phaser'
// import { initKeys } from '@/sockets/helpers'
import { Updater, Map } from '@/sockets/engine/classes'

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
        update
      }
    }
    const game = new ph.Game(config)
    console.log(game)
    const self = this

    function preload () {
      this.load.image('background', '/assets/swamplands/2 Background/Background.png')
      this.load.tilemapTiledJSON('map', '/tileMaps/json/testmap.json')
      this.load.image('Tileset', '/assets/swamplands/1 Tiles/Tileset.png')
      this.load.image('player', '/assets/characters/2 GraveRobber/GraveRobber.png')
    }

    function create () {
      const bg = this.add.image(gameField.width / 2, gameField.height / 2, 'background')
      bg.displayWidth = gameField.width
      bg.displayHeight = gameField.height

      this.map = this.add.tilemap('map')
      const TileSet = this.map.addTilesetImage('Tileset', 'Tileset')
      this.backgroundLayer = this.map.createStaticLayer('Слой тайлов 1', TileSet)
      this.backgroundLayer.setCollisionBetween(1, 50)

      this.otherPlayers = this.physics.add.group()

      self.socket = io('http://localhost:8000')
      self.socket.on('currentPlayers', (players) => {
        for (const [id, player] of Object.entries(players)) {
          if (id === self.socket.id) {
            self.addPlayer(this, player)
          } else {
            self.addOtherPlayer(this, player)
          }
        }
      })
      self.socket.on('newPlayer', (playerInfo) => {
        self.addOtherPlayer(this, playerInfo)
      })
      self.socket.on('disconnect', (playerId) => {
        this.otherPlayers.getChildren().forEach((otherPlayer) => {
          if (playerId === otherPlayer.playerId) {
            otherPlayer.destroy()
          }
        })
      })

      this.wasd = {
        up: this.input.keyboard.addKey(ph.Input.Keyboard.KeyCodes.W),
        down: this.input.keyboard.addKey(ph.Input.Keyboard.KeyCodes.S),
        left: this.input.keyboard.addKey(ph.Input.Keyboard.KeyCodes.A),
        right: this.input.keyboard.addKey(ph.Input.Keyboard.KeyCodes.D)
      }
      self.socket.on('playerMoved', (playerInfo) => {
        this.otherPlayers.getChildren().find((otherPlayer) => {
          if (playerInfo.playerId === otherPlayer.playerId) {
            otherPlayer.setPosition(playerInfo.x, playerInfo.y)
            return true
          }
        })
      })
    }

    function update () {
      if (this.player) {
        if (this.wasd.left.isDown) {
          this.player.setVelocityX(-160)
        } else if (this.wasd.right.isDown) {
          this.player.setVelocityX(160)
        } else {
          this.player.setVelocityX(0)
        }
        if (this.wasd.up.isDown && this.player.body.blocked.down) {
          this.player.setVelocityY(-330)
        }
        const x = this.player.x
        const y = this.player.y
        if (
          this.player.oldPosition &&
          (
            x !== this.player.oldPosition.x ||
            y !== this.player.oldPosition.y
          )
        ) {
          self.socket.emit('playerMovement', { x, y })
        }

        // save old position data
        this.player.oldPosition = {
          x: this.player.x,
          y: this.player.y
        }
      }
    }
  },
  methods: {
    addPlayer (game, playerInfo) {
      game.player = game.physics.add.sprite(playerInfo.x, playerInfo.y, 'player')
      game.physics.add.collider(game.player, game.backgroundLayer)
    },
    addOtherPlayer (game, playerInfo) {
      const otherPlayer = game.add.sprite(playerInfo.x, playerInfo.y, 'player')
      otherPlayer.playerId = playerInfo.playerId
      game.otherPlayers.add(otherPlayer)
      game.physics.add.collider(otherPlayer, game.backgroundLayer)
    }
  }
}
</script>
