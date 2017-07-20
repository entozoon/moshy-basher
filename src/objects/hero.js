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

    // this.sprite.body.setCollisionGroup(this.props.collisionGroup);
    // this.sprite.body.collides(
    //   [this.props.collisionGroup, this.props.collisionGroup],
    //   this.collision,
    //   this
    // );

    //this.sprite.body.setCollisionGroup(heroCollisionGroupWat);

    //this.sprite.body.createBodyCallback(oneEnemy.sprite, this.collision, this); // **
    //this.sprite.body.createGroupCallback(this.props.collisionGroup, this.collision, this);
    this.sprite.body.createGroupCallback(creatureCollisionGroup, wat, this);
    // ^ This callback will only fire if this Body has been assigned a collision group.
    // ^ Not convinced that it even works
  }

  collision(a, b, c, d) {
    console.log('dwa');
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
