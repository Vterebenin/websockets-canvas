<template lang="pug">
  canvas(id="game" ref="game")
</template>

<script>
import { Player } from '@/engine/classes'

export default {
  mounted () {
    const canvas = this.$refs.game
    if (canvas.getContext) {
      canvas.width = document.documentElement.clientWidth
      canvas.height = document.documentElement.clientHeight
      const player = new Player({ color: 'red' })
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = player.color
      ctx.fillRect(player.position.x, player.position.y, player.width, player.height)
    } else {
      // whatever
    }
  }
}
</script>
