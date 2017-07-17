# From: http://pandaqi.com/Games/phaser-physics-arcade-system

## Movement
  this.body.velocity.setTo(x, y); // (px/s) maxVelocity and minVelocity also available
  this.body.acceleration.setTo(x, y);
  this.body.drag.setTo(x, y); // Friction (px/s)
  this.body.allowRotation = true;
  this.body.angularVelocity = someRadianValue;
  this.body.angularDrag = someRadianValue;
  this.body.gravity.setTo(x, y);

## Collisions
  this.body.bounce.setTo(x, y); // How much it bounces on hit (0 -> 1, in percentages of collisionforce)
  this.body.immovable = true; // Whether it moves when hit by something (not that it can't move!)
  this.body.collideWorldBounds = true;

## In collision handler
  object.body.touching    (contains direction)
  object.body.wasTouching

## Read only
  this.body.speed
  this.body.position
  this.body.prev
  this.body.facing

## Advanced Movement

Accelerate object to x,y
  game.physics.arcade.accelerateToXY(object, x, y, speed, maxSpeedX, maxSpeedY);

Move the object to the x,y at given speed within a time
  game.physics.arcade.moveToXY(object, x, y, speed, maxTime);

Get angle between object and x,y
  game.physics.arcade.angleToXY(object, x, y);

Get distance between object and x,y
  game.physics.arcade.distanceToXY(object, x, y);

Set x,y velocity based on given angle and speed
  game.physics.arcade.velocityFromAngle(angle, speed);

Check if bodies intersect
  game.physics.arcade.intersects(body1, body2)
