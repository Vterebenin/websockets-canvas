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
  const colEntity1 = { onLeft: false, onRight: false, onBottom: false, onTop: false }
  const colEntity2 = { onLeft: false, onRight: false, onBottom: false, onTop: false }

  // if the position.x and position.y vector are less
  // than the half width or half height, they we must be
  // inside the object, causing a collision
  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
    // figures out on which side we are colliding (top, bottom, left, or right)
    const oX = hWidths - Math.abs(vX)
    const oY = hHeights - Math.abs(vY)
    if (oX >= oY) {
      if (vY > 0) {
        colEntity1.onTop = true
        shapeA.position.y += oY
      } else {
        colEntity1.onBottom = true
        shapeA.position.y -= oY
      }
    } else if (vX > 0) {
      colEntity1.onLeft = true
      shapeA.position.x += oX
    } else {
      colEntity1.onRight = true
      shapeA.position.x -= oX
    }
  }
  return [colEntity1, colEntity2]
}

module.exports = {
  initKeys,
  interpolate,
  colCheck
}
