import Phaser from 'phaser'
// SEE:  phaser-ce/src/gameobjects/Sprite.js
export default class extends Phaser.Sprite {
  constructor ({ game, x, y, sprite }) {
    super(game, x, y, sprite)

    this.anchor.setTo(0.5)

    game.physics.p2.enable(this, false) // true = debugging
    this.body.setCircle(22) // diameter

    console.log(this)
  }

  update () {
    this.body.velocity.x++
  }
}
