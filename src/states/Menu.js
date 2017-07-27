//
// MENU
// Press enter to play..
// (for now, just immediately start the game)
//
import Phaser from 'phaser'
// import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    // Load any assets in Boot rather than here

    // Display assets
    // this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    // centerGameObjects([this.loaderBg, this.loaderBar])

    // Load game assets
    this.load.image('creature', 'assets/images/creature.png')
  }

  create () {
    this.state.start('Game')
  }
}
