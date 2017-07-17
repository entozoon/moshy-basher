class Hero extends Creature {
  constructor(options) {
    super(options);

    this.keys = {
      // .isDown : bool
      // .timeDown : timestamp of the moment, not a timer!
      up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
      down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };
  }

  update() {
    if (this.keys.up.isDown) {
      //this.sprite.body.velocity.y -= 0.1;
      // Refer to the amount of time dt specifically, as it handles lag like a frameskip
      let dt = game.time.time - this.keys.up.timeDown;
      this.sprite.body.velocity.y -= dt * this.acceleration;
    }
    if (this.keys.down.isDown) {
      let dt = game.time.time - this.keys.down.timeDown;
      this.sprite.body.velocity.y += dt * this.acceleration;
    }
    if (this.keys.left.isDown) {
      let dt = game.time.time - this.keys.left.timeDown;
      this.sprite.body.velocity.x -= dt * this.acceleration;
    }
    if (this.keys.right.isDown) {
      let dt = game.time.time - this.keys.right.timeDown;
      this.sprite.body.velocity.x += dt * this.acceleration;
    }

    this.velocityLimit();
  }

  render() {}
}
