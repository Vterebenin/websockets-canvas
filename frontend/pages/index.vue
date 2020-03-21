<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
import { Player } from '@/engine/classes'

export default {
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
      const player = new Player({ color: 'red' })
      player.ctx = ctx
      player.requestAnimationFrame = requestAnimationFrame
      window.addEventListener('load', () => {
        player.update()
      })
    } else {
      // whatever
    }
  }
}
</script>
