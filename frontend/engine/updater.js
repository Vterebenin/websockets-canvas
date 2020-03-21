export const initKeys = (keys) => {
  document.body.addEventListener('keydown', (e) => {
    keys[e.keyCode] = true
  })

  document.body.addEventListener('keyup', (e) => {
    keys[e.keyCode] = false
  })
}
