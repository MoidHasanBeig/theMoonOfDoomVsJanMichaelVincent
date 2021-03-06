export default function playerSetup(game) {
  game.player = game.physics.add.sprite(200, 0, 'dude').setScale(0.3);
  game.player.setSize(200,550,false);
  game.player.setOffset(170,80);
  game.player.setCollideWorldBounds(true);
  game.player.setDepth(1);

  //player initial state
  game.playerState = {
    landed: true,
    walking: false,
    jumping: false,
    position: 'right',
    crouch: false,
    lookup: false,
    cross: false,
    firing: false,
    shoot: false,
    reloading: false,
    ammo: 80,
    health: 150,
    deadAnim: true,
    deadSound: true,
    score: 0
  }

  //bullets
  game.bullets = game.physics.add.group({
    classType: Phaser.GameObjects.Image,
    defaultKey: 'bullet',
    defaultFrame: null,
    active: true,
    maxSize: -1,
    runChildUpdate: false,
    createCallback: null,
    removeCallback: null,
    createMultipleCallback: null,
    allowGravity: false
  });

  //bullets limiter
  game.time.addEvent({
    delay: 100,
    callback: () => {
      game.playerState.shoot = true;
    },
    loop: true
  });

  //player sounds
  game.gunSound = game.sound.add('gun');
  game.gunSound.setVolume(0.1);
  game.jumpSound = game.sound.add('jump');
  game.jumpSound.setVolume(0.3);
}
