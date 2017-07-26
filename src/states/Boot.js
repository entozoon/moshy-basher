//
// BOOT
//
import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000'
    this.loadedFonts = false
  }

  preload () {
    // Fonts load asynchronously
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: () => {
        this.loadedFonts = true
      }
    })

    // "Loading.."
    // We could make a loader bar sprite that's cropped by loaded percentage with this.load.setPreloadSprite()
    let text = this.add.text(this.world.centerX, this.world.centerY, 'Loading..', {
      font: '18px Arial',
      fill: '#dddddd',
      align: 'center'
    })
    text.anchor.setTo(0.5, 0.5)

    // Load splash assets (synchronously)
    // this.load.image('loaderBg', './assets/images/loader-bg.png')
  }

  // Runs after preload
  render () {
    if (this.loadedFonts) {
      this.state.start('Menu')
    }
  }
}
