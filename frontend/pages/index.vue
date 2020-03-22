<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
import { initKeys } from '@/engine/helpers'
import { Player, Block, Updater, gameField } from '@/engine/classes/index'

export default {
  data () {
    return {
      keys: {}
    }
  },
  mounted () {
    const canvas = this.$refs.game
    if (canvas.getContext) {
      const { keys } = this
      const requestAnimationFrame =
        window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
      window.requestAnimationFrame = requestAnimationFrame
      const ctx = canvas.getContext('2d')
      canvas.width = gameField.width
      canvas.height = gameField.height
      initKeys(keys)

      const player = new Player({ color: 'red', ctx, requestAnimationFrame, keys })
      const blocks = []
      console.log(Block)
      blocks.push(new Block({
        width: 300,
        height: 50,
        position: {
          x: 400,
          y: gameField.height - 50
        },
        color: 'pink',
        ctx,
        requestAnimationFrame
      }))
      blocks.push(new Block({ width: 200, position: { x: 150, y: 200 }, color: 'red', ctx, requestAnimationFrame }))
      blocks.push(new Block({ width: 500, position: { x: 200, y: 300 }, color: 'green', ctx, requestAnimationFrame }))
      blocks.push(new Block({ width: 500, position: { x: 200, y: 300 }, color: 'black', ctx, requestAnimationFrame }))
      const updater = new Updater({ player, blocks, keys, ctx, requestAnimationFrame })
      window.addEventListener('load', () => {
        updater.update()
      })
    } else {
      // whatever
    }
  }
}
</script>
