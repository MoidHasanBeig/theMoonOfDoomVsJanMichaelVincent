export default function gunfire(game) {
  //bullet movements
  function create_callback(bullet, player, playerState) {
    if (bullet && bullet[0] && bullet[0].body) {
      bullet[0].visible = true;
      bullet[0].x = player.getCenter().x;
      bullet[0].y = player.getCenter().y;
      if (playerState.position === 'left') {
        bullet[0].body.velocity.x = -2000;
        bullet[0].flipX = true;
      }
      else if (playerState.position === 'right') {
        bullet[0].body.velocity.x = 2000;
        bullet[0].flipX = false;
      }
      if (playerState.cross) {
        if (playerState.position === 'right') {
          bullet[0].body.velocity.x = 1200;
          bullet[0].angle = -45;
        }
        else {
          bullet[0].body.velocity.x = -1200;
          bullet[0].angle = 45;
        }
        bullet[0].body.velocity.y = -600;
      }
      else if (playerState.lookup) {
        bullet[0].body.velocity.x = 0;
        bullet[0].body.velocity.y = -1500;
        playerState.position === 'right' ? bullet[0].angle = -90 : bullet[0].angle = 90;
      }
      game.playerState.ammo--;
    }
  }

  //shoot
  if (game.ctrlKey.isDown && game.playerState.shoot && game.playerState.ammo > 0) {
    game.bullet = game.bullets.createFromConfig({
      classType: Phaser.GameObjects.Image,
      key: 'bullet',
      frame: null,
      visible: false,
      active: true,
      repeat: 0,
      createCallback: create_callback(game.bullet, game.player, game.playerState),
      setXY: {
        x: game.player.getCenter().x,
        y: game.player.getCenter().y,
        stepX: 0,
        stepY: 0
      },
      setScale: {
        x: 0.6,
        y: 0.4
      }
    });
    game.playerState.shoot = false;
  }

  //reload
  if (game.rKey.isDown) game.playerState.ammo = 30;

  //bullets destroy
  if (game.bullets.children.entries) {
    for (let bul of game.bullets.children.entries) {
      if (
        bul.x > game.cameras.main.worldView.x + 1500
        || bul.x < game.cameras.main.worldView.x
        || bul.y < game.cameras.main.worldView.y
      ) bul.destroy();
    }
  }
}
