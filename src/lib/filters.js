// https://phaser.io/examples/v2/filters/mouse-ray
let filterFragment = [
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
