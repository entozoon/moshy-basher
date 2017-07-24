//
// Concatenates all /src files into /build/app.js as compiles to vanilla Javascript (es2015)
//
let game,
  graphics,
  creatures = [],
  creatureGroup,
  creatureCollisionGroup,
  hero,
  oneEnemy,
  gamepad,
  gamepadConnected = false,
  filter;

window.onload = () => {
  // (after images)
  game = new Phaser.Game({
    width: 200, // temporary
    height: 200,
    antialias: true, // false is a bit janky with rotation
    renderer: mobileAndTabletcheck() ? Phaser.CANVAS : Phaser.AUTO, // Phaser.CANVAS, Phaser.WEBGL, Phaser.AUTO (WEBGL if possible)
    state: {
      preload: preload,
      create: create,
      update: update,
      render: render
    }
  });
};

const preload = () => {
  // Images..
  game.load.image('hero', 'sprites/hero.png');
  game.load.image('creature', 'sprites/creature.png');
  game.load.image('bg', 'sprites/bg.png');
  //game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Gray.js');
};

const create = () => {
  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  game.scale.parentIsWindow = true;
  graphics = game.add.graphics(0, 0);

  // Physics
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.setImpactEvents(true);
  game.physics.p2.restitution = 0.8;

  creatureCollisionGroup = game.physics.p2.createCollisionGroup();

  creatureGroup = game.add.group();
  creatureGroup.enableBody = true;
  creatureGroup.physicsBodyType = Phaser.Physics.P2JS;

  game.input.gamepad.start();
  gamepad = game.input.gamepad.pad1;

  gamepad.addCallbacks(this, {
    onConnect: function() {
      console.log('Gamepad connected!');
      gamepadConnected = true;
    }
  });

  // ... other stuff ...

  // Need to think of a way to handle the ScaleManager resize better, surely a callback?
  setTimeout(() => {
    //                           x, y, width, height, key, frame
    let bg = game.add.tileSprite(0, 0, game.width, game.height, 'bg', 1);
    // has a .cameraOffset !

    filter = new Phaser.Filter(game, null, filterFragment);
    filter.setResolution(game.width, game.height);
    //bg.filters = [filter];
    game.world.filters = [filter];

    bg.fixedToCamera = true;
    // Apparently using groups is smarter than this, e.g.
    // http://examples.phaser.io/_site/view_full.html?d=groups&f=add+a+sprite+to+group.js
    game.world.sendToBack(bg);

    /**
     * z-index !
     * These work by having the last thing in the group being on top
     * Or in this case, their order in the creatures array I guess?
     * UPDATE it's actually the order of sprites within the  collision group
     * they're magically inside of, via setCollisionGroup
     */

    let center = {
      x: game.world.width / 2,
      y: game.world.height / 2
    };

    for (let x = 1; x <= 1; x++) {
      for (let y = 1; y >= 1; y--) {
        creatures.push(
          new Enemy({
            //x: center.x + (Math.random() * 2 - 1) * 75, // near center
            //y: center.y + (Math.random() * 2 - 1) * 75,
            x: game.world.randomX,
            y: game.world.randomY,
            collisionGroup: creatureCollisionGroup
          })
        );
      }
    }

    oneEnemy = new Enemy({
      //x: center.x + (Math.random() * 2 - 1) * 75, // near center
      //y: center.y + (Math.random() * 2 - 1) * 75,
      x: game.width / 2 + 100,
      y: game.height / 2,
      collisionGroup: creatureCollisionGroup
    });
    creatures.push(oneEnemy);

    hero = new Hero({
      x: game.width / 2,
      y: game.height / 2,
      sprite: 'hero',
      collisionGroup: creatureCollisionGroup,
      mass: 2 // heavier than people around in general
    });

    game.camera.follow(hero.sprite); // not working? or maybe? but world size..

    hero.sprite.body.createBodyCallback(creatures, dwa, this);
    // hero.sprite.body.collides(
    //   creatureGroup,
    //   function() {
    //     console.log('dwa');
    //   },
    //   this
    // );

    creatures.push(hero);
  }, 200);
};

const dwa = (a, b) => {
  console.log('yo');
};

// Shift these out to lib
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return '0x' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const update = () => {
  // Creatures
  creatures.forEach(creature => {
    //console.log(creature.id + ' of ' + creatures.length);
    if (creature === null) return;
    creature.update();
  });

  // Re-order array based on y position, for z-index reasons
  creatureGroup.children = creatureGroup.children.sort(function(a, b) {
    return a.position.y - b.position.y;
  });

  // Tint / brightness
  creatureGroup.children.map((sprite, i) => {
    // This isn't the right way to do this, but.. yeah.
    // Alsothey should have a random tint to start off with, looks sick
    // let brightness = Math.round(i / creatureGroup.children.length * 255);
    // UPDATE: Trying a game shader instead
    // let r = brightness,
    //   g = brightness,
    //   b = brightness;
    // sprite.tint = rgbToHex(r, g, b);
  });

  if (filter) {
    filter.update();
  }
};

const render = () => {
  // Clear
  graphics.clear();

  // Bg
  // graphics.beginFill(0x000000, 1);
  // graphics.drawRect(0, 0, game.width, game.height);
  // graphics.endFill();

  // Creatures
  creatures.forEach(creature => {
    if (creature === null) return;
    creature.render();
  });

  // if (creatures[0]) {
  //   console.log(creatures[0].sprite.position.y);
  // }
};
