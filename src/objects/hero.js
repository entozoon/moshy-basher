function wat() {
  console.log('wat');
}
class Hero extends Creature {
  constructor(props) {
    super(props);

    //this.props.gamepadAcceleration = 200;
    this.elapsed = 0;

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

  collision(a, b, c, d) {
    console.log('collide (hero)');
    // a.sprite.tint = 0xff0000;
    // b.sprite.tint = 0x00ff00;
    // console.log(a);
    // console.log(b);
    // console.log(c);
    // console.log(d);
  }

  handleKeyboard(dt) {
    // UP
    if (this.keys.up.isDown) {
      // Refer to the amount of time dt specifically, as it handles lag like a frameskip
      this.sprite.body.velocity.y -= dt * this.props.acceleration;
      //this.sprite.body.moveForward(dt * this.props.acceleration); // driving mode
    }
    // DOWN
    if (this.keys.down.isDown) {
      this.sprite.body.velocity.y += dt * this.props.acceleration;
      //this.sprite.body.moveBackward(dt * this.props.acceleration); // driving mode
    }
    // LEFT
    if (this.keys.left.isDown) {
      this.sprite.body.velocity.x -= dt * this.props.acceleration;
      //this.sprite.body.rotateLeft(dt * this.props.acceleration); // driving mode
    }
    // RIGHT
    if (this.keys.right.isDown) {
      this.sprite.body.velocity.x += dt * this.props.acceleration;
      //this.sprite.body.rotateRight(dt * this.props.acceleration); // driving mode
    }
  }

  handleGamepad(dt) {
    let axisX = gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
    let axisY = gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
    if (axisX) {
      this.sprite.body.velocity.x += this.props.acceleration * dt * axisX;
    }
    if (axisY) {
      this.sprite.body.velocity.y += this.props.acceleration * dt * axisY;
    }
  }

  update() {
    let dt = game.time.time - this.elapsed; // ms
    this.elapsed = game.time.time;

    if (gamepadConnected !== false) {
      this.handleGamepad(dt);
    }

    this.handleKeyboard(dt);

    super.update();
  }

  render() {}
}
