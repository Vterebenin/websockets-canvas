<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
import io from 'socket.io-client'
import { initKeys } from '@/engine/helpers'
import { Player, Block, Updater, gameField } from '@/engine/classes/index'

export default {
  data () {
    return {
      keys: {},
      socket: {}
    }
  },
  created () {
    this.socket = io('http://localhost:8000')
  },
  mounted () {
    const canvas = this.$refs.game
    if (canvas.getContext) {
      const { keys, socket } = this
      const requestAnimationFrame =
        window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
      window.requestAnimationFrame = requestAnimationFrame
      const ctx = canvas.getContext('2d')
      canvas.width = gameField.width
      canvas.height = gameField.height
      initKeys(keys)

      const player = new Player({ color: 'red', keys })
      const blocks = []
      console.log(Block)
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
      const updater = new Updater({ player, blocks, keys, ctx, requestAnimationFrame, socket })
      window.addEventListener('load', () => {
        updater.update()
      })
    } else {
      // whatever
    }
  }
}
</script>
