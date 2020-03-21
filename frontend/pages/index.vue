<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
import { initKeys, keys } from '@/engine/updater'
import { Player } from '@/engine/classes'

export default {
  data () {
    return {
      keys
    }
  },
  mounted () {
    const canvas = this.$refs.game
    if (canvas.getContext) {
      const requestAnimationFrame =
        window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
      window.requestAnimationFrame = requestAnimationFrame
      const ctx = canvas.getContext('2d')
      canvas.width = document.documentElement.clientWidth
      canvas.height = document.documentElement.clientHeight
      initKeys(this.keys)

      const player = new Player({ color: 'red' })
      player.ctx = ctx
      player.requestAnimationFrame = requestAnimationFrame
      player.keys = this.keys
      window.addEventListener('load', () => {
        player.update()
      })
    } else {
      // whatever
    }
  },
  watch: {
    keys () {
      console.log(this.keys)
    }
  }
}
</script>
