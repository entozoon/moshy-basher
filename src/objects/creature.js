class Creature {
  constructor(options) {
    // Take options as an object with default values and bosh into 'this' for brevity
    options = {
      x: options.x ? options.x : 100,
      y: options.y ? options.y : 100,
      acceleration: options.acceleration ? options.acceleration : 0.7,
      velocityMax: options.velocityMax ? options.velocityMax : 700,
      drag: options.drag ? options.drag : 2000,
      velocity: options.velocity ? options.velocity : { x: 0, y: 0 },
      sprite: options.sprite ? options.sprite : game.add.sprite(41, 42, 'creatureSprite')
    };
    for (var key in options) {
      this[key] = options[key];
    }

    // Physics
    //this.sprite.body.collideWorldBounds = true; // I'm _very_ not convinced the AoE is right on load
    physicalGroup.add(this.sprite);

    //this.sprite = physicalGroup.create(50, 100, 'creatureSprite', 1);

    // ID
    this.id = creatures.length;

    // Physics
    game.physics.arcade.enableBody(this.sprite);
    //this.sprite.body.collideWorldBounds = true; // I'm _very_ not convinced the AoE is right on load
    this.sprite.body.drag.setTo(this.drag, this.drag);

    // Bounding box
    this.sprite.body.setSize(24, 26, 11, 7); // w, h, x, y RECTANGLE COLLISION
    // Circular collision is wank in Arcade physics, so stick to square boxes like a platformer, otherwise use P2 for full physics
    //this.sprite.body.setCircle(20); // r, x, y CIRCLE COLLISION
    this.sprite.body.bounce.setTo(0.5, 0.5);
    this.sprite.body.mass = 20;

    this.sprite.body.immovable = false;

    // Position
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.body.velocity = options.velocity;

    // Pass 'this' context to sprite for referencing when handling collisions
    this.sprite.mother = this;

    // Attributes
    this.sprite.setHealth(100);

    // Keyboard.. (abstract this out to hero-only)
    //this.keyTest = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

    //http://www.html5gamedevs.com/topic/7256-generic-key-input/
    // game.input.keyboard.onDownCallback(() => {
    //   console.log('input captured (keyboard?)');
    //   console.log(game.input.keyboard.event.keyCode);
    // });
    // // maybe shift into update. ..??
    // game.input.onDown.add(function() {
    //   console.log('input captured (click?)');
    // });
  }

  getSprite() {
    return this.sprite;
  }

  processCallback(a, b) {
    // When two sprites collide, return false to skip collision entirely
    return true;
  }

  destroy() {
    // Destroy physical object
    physicalGroup.remove(this.sprite, true); // true also runs this.sprite.destroy()

    creatures = creatures.filter((creature, i) => {
      return creature.id == this.id;
    });
  }

  wasTouched() {
    this.sprite.damage(0.1);
    console.log('HP: ' + this.sprite.health);

    if (this.sprite.health <= 0) {
      // Let it skip a beat before destroying because (and this took me AGES to figure out)..
      // The collisions will still be running for the rest of the group on removed objects otherwise.
      this.dying = true;
      return;
    }
  }

  collideCallback(a, b) {
    // a (this) and b sprites aren't reliable in that it can't distinguish which hit which.
    // So just be dead ambivolent about it
    // a.tint = 0xff0000;
    // b.tint = 0x000000;
    // if (!a.body.touching.none) {
    //   console.log(a.body.touching);
    // }

    // Touch each other. Feels good. Harder.
    if (a.mother) {
      a.mother.wasTouched();
    }
    if (b.mother) {
      b.mother.wasTouched();
    }
  }

  velocityLimit() {
    this.sprite.body.velocity.y = constrain(
      this.sprite.body.velocity.y,
      -this.velocityMax,
      this.velocityMax
    );
    this.sprite.body.velocity.x = constrain(
      this.sprite.body.velocity.x,
      -this.velocityMax,
      this.velocityMax
    );
  }

  /* // 'Drag' is better, and built-in
  friction() {
    this.sprite.body.velocity.y -= Math.sign(this.sprite.body.velocity.y) * this.frictionMovement;
    this.sprite.body.velocity.x -= Math.sign(this.sprite.body.velocity.x) * this.frictionMovement;
  }
  */

  update() {
    if (this.dying) {
      this.destroy();
    }

    game.physics.arcade.collide(
      this.sprite,
      physicalGroup,
      this.collideCallback,
      this.processCallback,
      this
    );
    // .overlap is also a thing. Detects overlap without causing a collision as such

    this.velocityLimit();
    //this.friction();
  }

  render() {
    game.debug.body(this.sprite);
  }
}
