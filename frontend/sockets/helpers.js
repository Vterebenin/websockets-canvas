const initKeys = (keys) => {
  document.body.addEventListener('keydown', (e) => {
    keys[e.keyCode] = true
  })

  document.body.addEventListener('keyup', (e) => {
    keys[e.keyCode] = false
  })
}

const interpolate = (start, stop, amt) => {
  return amt * (stop - start) + start
}

const colCheck = (shapeA, shapeB) => {
  const vX = (shapeA.position.x + (shapeA.width / 2)) - (shapeB.position.x + (shapeB.width / 2))
  const vY = (shapeA.position.y + (shapeA.height / 2)) - (shapeB.position.y + (shapeB.height / 2))
  // add the half widths and half heights of the objects
  const hWidths = (shapeA.width / 2) + (shapeB.width / 2)
  const hHeights = (shapeA.height / 2) + (shapeB.height / 2)
  let colDir

  // if the position.x and position.y vector are less
  // than the half width or half height, they we must be
  // inside the object, causing a collision
  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
    // figures out on which side we are colliding (top, bottom, left, or right)
    const oX = hWidths - Math.abs(vX)
    const oY = hHeights - Math.abs(vY)
    if (oX >= oY) {
      if (vY > 0) {
        colDir = 't'
        shapeA.position.y += oY
      } else {
        colDir = 'b'
        shapeA.position.y -= oY
      }
    } else if (vX > 0) {
      colDir = 'l'
      shapeA.position.x += oX
    } else {
      colDir = 'r'
      shapeA.position.x -= oX
    }
  }
  return colDir
}

module.exports = {
  initKeys,
  interpolate,
  colCheck
}
