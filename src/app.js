//
// Concatenates all /src files into /build/app.js as compiles to vanilla Javascript (es2015)
//
let game,
  graphics,
  creatures = [],
  creatureGroup,
  hero,
  gamepad,
  gamepadConnected = false,
  filter;

window.onload = () => {
  // (after images)
  game = new Phaser.Game({
    width: 200, // temporary
    height: 200,
    antialias: true, // false is a bit janky with rotation
    renderer: Phaser.AUTO, // Phaser.CANVAS, Phaser.WEBGL, Phaser.AUTO (WEBGL if possible)
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

  //  Create our collision groups. One for the player, one for the pandas
  const creatureCollisionGroup = game.physics.p2.createCollisionGroup();

  //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
  //  (which we do) - what this does is adjust the bounds to use its own collision group.
  game.physics.p2.updateBoundsCollisionGroup();

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

    // var gray = game.add.filter('Gray');
    // bg.filters = [gray];

    // https://phaser.io/examples/v2/filters/mouse-ray
    let fragmentSrc = [
      'precision mediump float;',

      // 'uniform float     time;',
      'uniform vec2      resolution;',

      // 'float rand(int seed, float ray) {',
      // '    return mod(sin(float(seed)*1.0+ray*1.0)*1.0, 1.0);',
      // '}',
      //

      'uniform float time;',
      'varying vec2 vTextureCoord;',
      'uniform sampler2D uSampler;',
      'float lightnessX;',
      'float lightnessY;',
      'float multiplierR;',
      'float multiplierG;',
      'float multiplierB;',

      'void main( void ) {',
      //'gl_FragColor = vec4(0.4,0.9,0.8,1.0);',
      '  vec4 texture = texture2D(uSampler, vTextureCoord);',
      'vec2 pixel = gl_FragCoord.xy / resolution.xy;',

      //'  if (pixel.x < 0.5) {',
      //'    texture = vec4(1.0, 0.0, 1.0, 0.5);',
      //'    texture = vec4(texture.r, texture.r, texture.r, 0.85);', // god this is awesome, for danger..?
      // Each pixel is its own colour, minus colour values to darken it
      //'    texture = texture - vec4(1, 1, 1, 1) * (1.0 - pixel.y);', // lighter at top
      //'    texture = texture - vec4(1, 1, 1, 1) * pixel.y;',
      //'    texture = texture * vec4(0.1, 0.1, 0.1, 0.1) + vec4(0.1, 0.1, 0.1, 0.1);', // desaturate..
      //'    texture = texture - vec4(1,1,1,1) * pixel.y + vec4(0.1, 0.1, 0.1, 0.1);',
      //'    texture = texture * vec4(0.1, 0.1, 0.1, 0.1) * ((1.0 - pixel.y) / 0.1);', // light at bottom
      '    lightnessX = 1.0 - abs(pixel.x * 2.0 - 1.0);',
      '    lightnessY = 1.0 - pixel.y;',
      //                Gradual random colour change + strobe flash
      '    multiplierR = 1.0 + 0.5 * sin(time * 1.0) + (1.0 - abs(sin(time * 10.0))) * 0.25;',
      '    multiplierG = 1.0 + 0.5 * sin(time * 2.0) + (1.0 - abs(sin(time * 10.0))) * 0.25;',
      '    multiplierB = 1.0 + 0.5 * sin(time * 3.0) + (1.0 - abs(sin(time * 10.0))) * 0.25;',
      //'    texture = texture * vec4(lightnessX, lightnessX, lightnessX, 1) * lightnessY;',
      '    texture = texture * vec4(lightnessX * multiplierR, lightnessX * multiplierG, lightnessX * multiplierB, 1) * lightnessY;',
      //'  }',

      //'  gl_FragColor.a = 0.5;',
      '  gl_FragColor = texture;',

      // '    float pi = 3.14159265359;',
      // '    vec2 position = ( gl_FragCoord.xy / resolution.xy ) - mouse;',
      // '    position.y *= resolution.y/resolution.x;',
      // '    float ang = atan(position.y, position.x);',
      // '    float dist = length(position);',
      // '    gl_FragColor.rgb = vec3(0.5, 0.5, 0.5) * (pow(dist, -1.0) * 0.05);',
      //'    gl_FragColor.a = 0.2;',
      // '    for (float ray = 0.0; ray < 18.0; ray += 1.0) {',
      // '        //float rayang = rand(5234, ray)*6.2+time*5.0*(rand(2534, ray)-rand(3545, ray));',
      // '        //float rayang = time + ray * (1.0 * (1.0 - (1.0 / 1.0)));',
      // '        float rayang = (((ray) / 9.0) * 3.14) + (time * 0.1            );',
      // '        rayang = mod(rayang, pi*2.0);',
      // '        if (rayang < ang - pi) {rayang += pi*2.0;}',
      // '        if (rayang > ang + pi) {rayang -= pi*2.0;}',
      // '        float brite = 0.3 - abs(ang - rayang);',
      // '        brite -= dist * 0.2;',
      // '        if (brite > 0.0) {',
      // '            gl_FragColor.rgba += vec4(sin(ray*mouse.y+0.0)+1.0, sin(ray*mouse.y+2.0)+1.0, sin(ray*mouse.y+4.0)+1.0, 0.25) * brite;',
      // '            gl_FragColor.a = 0.25;',
      // '        }',
      // '    }',
      //'    gl_FragColor.a = 0.25;',
      '}'
    ];

    filter = new Phaser.Filter(game, null, fragmentSrc);
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

    for (let x = 1; x <= 20; x++) {
      for (let y = 6; y >= 1; y--) {
        creatures.push(
          new Enemy({
            //x: center.x + (Math.random() * 2 - 1) * 75, // near center
            //y: center.y + (Math.random() * 2 - 1) * 75,
            x: game.world.randomX,
            y: game.world.randomY,
            collisionGroup: creatureGroup
          })
        );
      }
    }

    hero = new Hero({
      x: game.width / 2,
      y: game.height / 2,
      sprite: 'hero',
      collisionGroup: creatureGroup,
      mass: 2 // heavier than people around in general
    });
    creatures.push(hero);
  }, 200);
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
