// This is dumb but, do do stuff this way
export const centerGameObjects = objects => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}
