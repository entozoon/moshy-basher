class Enemy extends Creature {
  constructor(props) {
    super(props);

    this.props.maxSpeed = 10 + Math.random() * 30;
    this.props.speed = this.props.maxSpeed;
  }

  moveTowardHero() {
    //let point = new Phaser.Point(this.sprite.body.x, this.sprite.body.y);
    //let angle = point.angle(hero.sprite.body);

    let vectorToHero = vectorBetweenPointsOfMagnitudeOne(this.sprite.body, hero.sprite.body);

    this.sprite.body.velocity.y = vectorToHero.y * this.props.speed;
    this.sprite.body.velocity.x = vectorToHero.x * this.props.speed;
  }

  collision(a, b, c, d) {
    // I'm seriously considering forcing 'this' to be .sprite in all situations
    if (b.sprite.isHero) {
      console.log('collide (enemy <- hero)');
      let speed = Math.abs(b.velocity.x) + Math.abs(b.velocity.y);
      if (speed > 200) {
        this.fallOverForAWhile(speed * 3);
      }
    }
  }

  update() {
    if (!this.fallen) {
      this.moveTowardHero();
    }
    super.update();
  }
}
