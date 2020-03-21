<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
import { initKeys } from '@/engine/updater'
import { Player, Block, Updater, gameField } from '@/engine/classes'

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
      const block = new Block({ color: 'blue', ctx, requestAnimationFrame })
      const blocks = [block]
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
