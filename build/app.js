'use strict';var game,graphics,creatures=[],creatureGroup,creatureCollisionGroup,heroCollisionGroupWat,hero,oneEnemy,gamepad,gamepadConnected=!1,filter;window.onload=function(){game=new Phaser.Game({width:200,height:200,antialias:!0,renderer:mobileAndTabletcheck()?Phaser.CANVAS:Phaser.AUTO,state:{preload:preload,create:create,update:update,render:render}})};var preload=function(){game.load.image('hero','sprites/hero.png'),game.load.image('creature','sprites/creature.png'),game.load.image('bg','sprites/bg.png')},create=function(){game.scale.scaleMode=Phaser.ScaleManager.RESIZE,game.scale.parentIsWindow=!0,graphics=game.add.graphics(0,0),game.physics.startSystem(Phaser.Physics.P2JS),game.physics.p2.setImpactEvents(!0),game.physics.p2.restitution=0.8,creatureCollisionGroup=game.physics.p2.createCollisionGroup(),heroCollisionGroupWat=game.physics.p2.createCollisionGroup(),creatureGroup=game.add.group(),creatureGroup.enableBody=!0,creatureGroup.physicsBodyType=Phaser.Physics.P2JS,game.input.gamepad.start(),gamepad=game.input.gamepad.pad1,gamepad.addCallbacks(void 0,{onConnect:function onConnect(){console.log('Gamepad connected!'),gamepadConnected=!0}}),setTimeout(function(){var d=game.add.tileSprite(0,0,game.width,game.height,'bg',1);filter=new Phaser.Filter(game,null,['precision mediump float;','uniform vec2      resolution;','uniform float time;','varying vec2 vTextureCoord;','uniform sampler2D uSampler;','float lightnessX;','float lightnessY;','float multiplierR;','float multiplierG;','float multiplierB;','void main( void ) {','  vec4 texture = texture2D(uSampler, vTextureCoord);','vec2 pixel = gl_FragCoord.xy / resolution.xy;','    lightnessX = 1.0 - abs(pixel.x * 2.0 - 1.0);','    lightnessY = 1.0 - pixel.y;','    multiplierR = 1.0 + 0.5 * sin(time * 1.0) + (1.0 - abs(sin(time * 10.0))) * 0.25;','    multiplierG = 1.0 + 0.5 * sin(time * 2.0) + (1.0 - abs(sin(time * 10.0))) * 0.25;','    multiplierB = 1.0 + 0.5 * sin(time * 3.0) + (1.0 - abs(sin(time * 10.0))) * 0.25;','    texture = texture * vec4(lightnessX * multiplierR, lightnessX * multiplierG, lightnessX * multiplierB, 1) * lightnessY;','  gl_FragColor = texture;','}']),filter.setResolution(game.width,game.height),game.world.filters=[filter],d.fixedToCamera=!0,game.world.sendToBack(d);for(var f={x:game.world.width/2,y:game.world.height/2},h=1;4>=h;h++)for(var j=4;1<=j;j--)creatures.push(new Enemy({x:game.world.randomX,y:game.world.randomY,collisionGroup:creatureGroup}));oneEnemy=new Enemy({x:game.width/2+100,y:game.height/2,collisionGroup:creatureCollisionGroup}),creatures.push(oneEnemy),hero=new Hero({x:game.width/2,y:game.height/2,sprite:'hero',collisionGroup:creatureCollisionGroup,mass:2}),game.camera.follow(hero.sprite),hero.sprite.body.createBodyCallback(creatures,dwa,void 0),creatures.push(hero)},200)},dwa=function(){console.log('yo')};function componentToHex(d){var e=d.toString(16);return 1==e.length?'0'+e:e}function rgbToHex(d,e,f){return'0x'+componentToHex(d)+componentToHex(e)+componentToHex(f)}var update=function(){creatures.forEach(function(d){null===d||d.update()}),creatureGroup.children=creatureGroup.children.sort(function(d,e){return d.position.y-e.position.y}),creatureGroup.children.map(function(){}),filter&&filter.update()},render=function(){graphics.clear(),creatures.forEach(function(d){null===d||d.render()})};
"use strict";window.mobileAndTabletcheck=function(){var b=!1;return function(c){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(c)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(c.substr(0,4)))&&(b=!0)}(navigator.userAgent||navigator.vendor||window.opera),b};
"use strict";var constrain=function(c,d,e){return c<d?d:c>e?e:c},vectorBetweenPointsOfMagnitudeOne=function(c,d){var e=d.x-c.x,f=d.y-c.y,g=Math.sqrt(e*e+f*f);return{x:e/g,y:f/g}};
'use strict';var _createClass=function(){function c(d,e){for(var g,f=0;f<e.length;f++)g=e[f],g.enumerable=g.enumerable||!1,g.configurable=!0,'value'in g&&(g.writable=!0),Object.defineProperty(d,g.key,g)}return function(d,e,f){return e&&c(d.prototype,e),f&&c(d,f),d}}();function _classCallCheck(c,d){if(!(c instanceof d))throw new TypeError('Cannot call a class as a function')}var Creature=function(){function c(d){_classCallCheck(this,c),this.props={x:d.x?d.x:100,y:d.y?d.y:100,acceleration:d.acceleration?d.acceleration:5,velocity:d.velocity?d.velocity:{x:0,y:0},damping:d.damping?d.damping:0.999,maxVelocity:d.maxVelocity?d.maxVelocity:400,angularDamping:d.angularDamping?d.angularDamping:1,sprite:d.sprite?d.sprite:'creature',collisionGroup:d.collisionGroup,mass:d.mass?d.mass:0.5+0.5*Math.random()},this.sprite=game.add.sprite(this.props.x,this.props.y,this.props.sprite),creatureGroup.add(this.sprite),game.physics.p2.enable(this.sprite,!1),this.sprite.body.setCollisionGroup(creatureCollisionGroup),this.sprite.width*=2,this.sprite.height*=2,this.sprite.smoothed=!1,this.sprite.body.setCircle(20),this.sprite.body.angularDamping=this.props.angularDamping,this.sprite.body.damping=this.props.damping,this.sprite.body.mass=this.props.mass,this.sprite.body.fixedRotation=!0}return _createClass(c,[{key:'collision',value:function collision(d,e){console.log(d),console.log(e)}},{key:'processCallback',value:function processCallback(){return!0}},{key:'destroy',value:function destroy(){var d=this;this.props.collisionGroup.remove(this.sprite,!0),creatures=creatures.filter(function(e){return e.id==d.id})}},{key:'velocityLimit',value:function velocityLimit(){this.sprite.body.velocity.x=constrain(this.sprite.body.velocity.x,-this.props.maxVelocity,this.props.maxVelocity),this.sprite.body.velocity.y=constrain(this.sprite.body.velocity.y,-this.props.maxVelocity,this.props.maxVelocity)}},{key:'update',value:function update(){this.dying&&this.destroy(),this.velocityLimit()}},{key:'render',value:function render(){}}]),c}();
"use strict";var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_get=function a(b,c,d){null===b&&(b=Function.prototype);var e=Object.getOwnPropertyDescriptor(b,c);if(e===void 0){var f=Object.getPrototypeOf(b);return null===f?void 0:a(f,c,d)}if("value"in e)return e.value;var g=e.get;return void 0===g?void 0:g.call(d)};function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return b&&("object"==typeof b||"function"==typeof b)?b:a}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var Enemy=function(a){function b(c){_classCallCheck(this,b);var d=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,c));return d.props.maxSpeed=10+30*Math.random(),d.props.speed=d.props.maxSpeed,d}return _inherits(b,a),_createClass(b,[{key:"moveTowardHero",value:function moveTowardHero(){var c=vectorBetweenPointsOfMagnitudeOne(this.sprite.body,hero.sprite.body);this.sprite.body.velocity.y=c.y*this.props.speed,this.sprite.body.velocity.x=c.x*this.props.speed}},{key:"update",value:function update(){this.moveTowardHero(),_get(b.prototype.__proto__||Object.getPrototypeOf(b.prototype),"update",this).call(this)}}]),b}(Creature);
'use strict';var _createClass=function(){function e(f,g){for(var j,h=0;h<g.length;h++)j=g[h],j.enumerable=j.enumerable||!1,j.configurable=!0,'value'in j&&(j.writable=!0),Object.defineProperty(f,j.key,j)}return function(f,g,h){return g&&e(f.prototype,g),h&&e(f,h),f}}(),_get=function e(f,g,h){null===f&&(f=Function.prototype);var j=Object.getOwnPropertyDescriptor(f,g);if(j===void 0){var k=Object.getPrototypeOf(f);return null===k?void 0:e(k,g,h)}if('value'in j)return j.value;var l=j.get;return void 0===l?void 0:l.call(h)};function _classCallCheck(e,f){if(!(e instanceof f))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(e,f){if(!e)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return f&&('object'==typeof f||'function'==typeof f)?f:e}function _inherits(e,f){if('function'!=typeof f&&null!==f)throw new TypeError('Super expression must either be null or a function, not '+typeof f);e.prototype=Object.create(f&&f.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),f&&(Object.setPrototypeOf?Object.setPrototypeOf(e,f):e.__proto__=f)}function wat(){console.log('wat')}var Hero=function(e){function f(g){_classCallCheck(this,f);var h=_possibleConstructorReturn(this,(f.__proto__||Object.getPrototypeOf(f)).call(this,g));return h.elapsed=0,h.keys={up:game.input.keyboard.addKey(Phaser.Keyboard.UP),down:game.input.keyboard.addKey(Phaser.Keyboard.DOWN),left:game.input.keyboard.addKey(Phaser.Keyboard.LEFT),right:game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),space:game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)},h.sprite.body.createGroupCallback(creatureCollisionGroup,wat,h),h.sprite.body.createGroupCallback(creatureGroup,wat,h),h}return _inherits(f,e),_createClass(f,[{key:'collision',value:function collision(){console.log('dwa')}},{key:'handleKeyboard',value:function handleKeyboard(g){this.keys.up.isDown&&(this.sprite.body.velocity.y-=g*this.props.acceleration),this.keys.down.isDown&&(this.sprite.body.velocity.y+=g*this.props.acceleration),this.keys.left.isDown&&(this.sprite.body.velocity.x-=g*this.props.acceleration),this.keys.right.isDown&&(this.sprite.body.velocity.x+=g*this.props.acceleration)}},{key:'handleGamepad',value:function handleGamepad(g){var h=gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X),j=gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);h&&(this.sprite.body.velocity.x+=this.props.acceleration*g*h),j&&(this.sprite.body.velocity.y+=this.props.acceleration*g*j)}},{key:'update',value:function update(){var g=game.time.time-this.elapsed;this.elapsed=game.time.time,!1!==gamepadConnected&&this.handleGamepad(g),this.handleKeyboard(g),_get(f.prototype.__proto__||Object.getPrototypeOf(f.prototype),'update',this).call(this)}},{key:'render',value:function render(){}}]),f}(Creature);
