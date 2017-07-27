import Phaser from 'phaser'
//
// RIGHT WHAT I'M GOING TO DO HERE IS
// Composition, rather than inheritance
//
//

const barker = state => ({
  bark: () => console.log('Woof, I am ' + state.name)
})

const hero = name => {
  let creature = new Creature({
    game: this.game,
    x: this.world.centerX - 200,
    y: this.world.centerY,
    sprite: 'creature'
  })

  let state = {
    name,
    speed: 100,
    position: 0
  }
  return Object.assign({}, barker(state))
}
const bruno = hero('bruno')
bruno.bark() // "Woof, I am Bruno"
console.log(bruno.state)

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, sprite }) {
    super(game, x, y, sprite)

    this.anchor.setTo(0.5)

    game.physics.p2.enable(this, false) // true = debugging
    this.body.setCircle(22) // diameter

    console.log(this)
  }

  update () {}
}
