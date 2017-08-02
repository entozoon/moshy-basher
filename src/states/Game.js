/* globals debug */
import Phaser from 'phaser'
import Creature from '../sprites/Creature'
import Hero from '../sprites/Hero'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, 'in states/game.js')
    // banner.font = 'Bangers'
    // banner.padding.set(10, 16)
    // banner.fontSize = 40
    // banner.fill = '#77BFA3'
    // banner.smoothed = false
    // banner.anchor.setTo(0.5)

    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.physics.p2.setImpactEvents(true)

    this.creature = new Creature({
      game: this.game,
      x: this.world.centerX - 200,
      y: this.world.centerY,
      sprite: 'creature'
    })

    this.hero = new Hero({
      game: this.game,
      x: this.world.centerX + 200,
      y: this.world.centerY,
      sprite: 'creature'
    })

    this.hero.bark()

    // Adds an existing display object
    this.game.add.existing(this.creature)
    this.game.add.existing(this.hero)
  }

  render () {
    if (debug) {
      this.game.debug.spriteInfo(this.creature, 32, 32)
    }
  }
}
