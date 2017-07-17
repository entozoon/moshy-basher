class Creature {
  constructor(props) {
    // Take props as an object with default values and bosh into 'this' for brevity
    this.props = {
      x: props.x ? props.x : 100,
      y: props.y ? props.y : 100,
      acceleration: props.acceleration ? props.acceleration : 0.7,
      velocityMax: props.velocityMax ? props.velocityMax : 700,
      drag: props.drag ? props.drag : 10,
      velocity: props.velocity ? props.velocity : { x: 0, y: 0 },
      damping: props.damping ? props.damping : 0.99, // 0 -> 1
      angularDamping: props.angularDamping ? props.angularDamping : 0.5, // 0 -> 1
      sprite: props.sprite ? props.sprite : 'creature',
      collisionGroup: props.collisionGroup
    };
    // for (var key in props) {
    //   this[key] = props[key];
    // }

    this.sprite = this.props.collisionGroup.create(this.props.x, this.props.y, this.props.sprite);

    this.sprite.body.setCollisionGroup(this.props.collisionGroup);

    this.sprite.body.collides([this.props.collisionGroup, this.props.collisionGroup]);

    //this.sprite.scale.set(2);
    this.sprite.body.setCircle(38 / 2); // diameter?

    this.sprite.setHealth(100);

    this.sprite.body.angularDamping = this.props.angularDamping;
    this.sprite.body.damping = this.props.damping;
  }

  drag() {
    //console.log(this.sprite.body.velocity);
    //this.sprite.body.velocity.y -= Math.sign(this.sprite.body.velocity.y) * this.props.drag;
    //console.log(this.sprite.body.velocity);
    //this.sprite.body.velocity.x -= Math.sign(this.sprite.body.velocity.x) * this.props.drag;
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

  velocityLimit() {
    this.sprite.body.velocity.y = constrain(
      this.sprite.body.velocity.y,
      -this.props.velocityMax,
      this.props.velocityMax
    );
    this.sprite.body.velocity.x = constrain(
      this.sprite.body.velocity.x,
      -this.props.velocityMax,
      this.props.velocityMax
    );
  }

  update() {
    if (this.dying) {
      this.destroy();
    }

    this.drag();
    //this.velocityLimit();
  }

  render() {
    game.debug.body(this.sprite);
  }
}
