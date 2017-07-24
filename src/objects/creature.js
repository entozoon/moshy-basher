class Creature {
  constructor(props) {
    // Take props as an object with default values and bosh into 'this' for brevity
    this.props = {
      x: props.x ? props.x : 100,
      y: props.y ? props.y : 100,
      acceleration: props.acceleration ? props.acceleration : 5,
      velocity: props.velocity ? props.velocity : { x: 0, y: 0 },
      damping: props.damping ? props.damping : 0.999, // 0 -> 1 (friction)
      maxVelocity: props.maxVelocity ? props.maxVelocity : 400,
      angularDamping: props.angularDamping ? props.angularDamping : 1, // 0 -> 1
      sprite: props.sprite ? props.sprite : 'creature',
      collisionGroup: props.collisionGroup,
      mass: props.mass ? props.mass : 0.5 + Math.random() * 0.5 // 0.5 -> 1
    };

    this.sprite = game.add.sprite(this.props.x, this.props.y, this.props.sprite);

    game.physics.p2.enable(this.sprite, false); // true = debugging

    //this.sprite.tint = Math.random() * 0xffffff;

    //this.sprite.scale.set(0.5);
    //this.sprite.scale.set(1.5);
    this.sprite.width *= 2;
    this.sprite.height *= 2;
    this.sprite.smoothed = false;
    this.sprite.body.setCircle(20); // diameter (gotta shift this to upper body..?)
    //this.sprite.setHealth(100); // don't think it'll be a health/damage situation..

    this.sprite.body.angularDamping = this.props.angularDamping;
    this.sprite.body.damping = this.props.damping;
    this.sprite.body.mass = this.props.mass;
    this.sprite.body.fixedRotation = true;

    //this.sprite.body.collideWorldBounds = false;

    creatureGroup.add(this.sprite);

    this.sprite.body.setCollisionGroup(this.props.collisionGroup);

    // Never managed to get this working:
    //this.sprite.body.createGroupCallback(creatureCollisionGroup, this.collision, this);

    // https://phaser.io/examples/v2/p2-physics/collision-groups
    this.sprite.body.collides(creatureCollisionGroup, this.collision, this);
  }

  collision(a, b, c, d) {
    //console.log('Creature collide');
  }

  processCallback(a, b) {
    // When two sprites collide, return false to skip collision entirely
    return true;
  }

  destroy() {
    // Destroy physical object
    this.props.collisionGroup.remove(this.sprite, true); // true also runs this.sprite.destroy()

    creatures = creatures.filter((creature, i) => {
      return creature.id == this.id;
    });
  }

  // Mostly taken care of by damping (friction) but not quite
  velocityLimit() {
    this.sprite.body.velocity.x = constrain(
      this.sprite.body.velocity.x,
      -this.props.maxVelocity,
      this.props.maxVelocity
    );

    this.sprite.body.velocity.y = constrain(
      this.sprite.body.velocity.y,
      -this.props.maxVelocity,
      this.props.maxVelocity
    );
  }

  update() {
    if (this.dying) {
      this.destroy();
    }

    this.velocityLimit();
  }

  render() {
    //game.debug.body(this.sprite);
  }
}
