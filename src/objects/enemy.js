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
    console.log('collide (enemy)');
    console.log(b);
    // I'm seriously considering forcing 'this' to be .sprite in all situations
    if (b.sprite.isHero) {
      this.fallOverForAWhile(2000);
    }
  }

  update() {
    if (!this.fallen) {
      this.moveTowardHero();
    }
    super.update();
  }
}
