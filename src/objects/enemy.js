class Enemy extends Creature {
  constructor(props) {
    super(props);

    this.props.maxSpeed = 10 + Math.random() * 30;
    this.props.speed = this.props.maxSpeed;
  }

  moveTowardHero() {
    // This isn't right! hah, but..
    // this.sprite.body.velocity.x = hero.sprite.body.x - this.sprite.body.x;
    // this.sprite.body.velocity.y = hero.sprite.body.y - this.sprite.body.y;

    //let point = new Phaser.Point(this.sprite.body.x, this.sprite.body.y);
    //let angle = point.angle(hero.sprite.body);

    let vectorToHero = vectorBetweenPointsOfMagnitudeOne(this.sprite.body, hero.sprite.body);

    this.sprite.body.velocity.y = vectorToHero.y * this.props.speed;
    this.sprite.body.velocity.x = vectorToHero.x * this.props.speed;
  }

  update() {
    this.moveTowardHero();
    super.update();
  }
}
