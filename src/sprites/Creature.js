import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, sprite }) {
    super(game, x, y, sprite)

    this.anchor.setTo(0.5)
  }

  update () {
    this.position.x++
  }
}
