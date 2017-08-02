import 'pixi'
import 'p2'
import Phaser from 'phaser'

// These can be called anything, as they're `export default`
import BootState from './states/Boot'
import MenuState from './states/Menu'
import GameState from './states/Game'

class Game extends Phaser.Game {
  constructor () {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    // this.state is a StateManager object.
    // States are situations you can just bosh into, even from render() like
    // this.state.start('GameOver')
    //             key,    state,     autoStart
    this.state.add('Boot', BootState, true)
    this.state.add('Menu', MenuState, false)
    this.state.add('Game', GameState, false)
  }
}

window.game = new Game()
