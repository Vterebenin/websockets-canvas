export const keys = {}
export const initKeys = (keys) => {
  document.body.addEventListener('keydown', (e) => {
    keys[e.keyCode] = true
    console.log(keys)
  })

  document.body.addEventListener('keyup', (e) => {
    keys[e.keyCode] = false
    console.log(keys)
  })
}
