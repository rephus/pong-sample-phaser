/*
Level module
Dependency: null
*/
define(['module/HUD'], function(HUD){

    //Private variables
    var game = null;
    var ball, paddle1, paddle2 ;

    var ballSpeed =  {x: 5, y: 5};
    var ballOrig;

    function paddleCollision(obj1, obj2) {
    ballSpeed.x = -ballSpeed.x;
    ball.x = ball.x + 30 - Math.abs(obj2.x - obj1.x); //Fix vertical collision
    }

    function createPaddle(x,y){
      var paddle = game.add.sprite(x,y, 'dot');
      paddle.height = 100;
      paddle.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(paddle, Phaser.Physics.ARCADE);
      paddle.body.collideWorldBounds = true;

      return paddle;
    }

    function moveBall(){
      ball.x += ballSpeed.x;
      ball.y += ballSpeed.y;
    }

    function outOfBounds() {
      //all this logic can ve avoided using colliderWorldBounds,
      // bounce and velocity properties
      if (ball.x < 0) {
          ball.x = ballOrig.x; ball.y = ballOrig.y;
          ballSpeed.x = -ballSpeed.x;
          HUD.addScore2();
      }
      if (ball.x > game.world.width) {
          ball.x = ballOrig.x; ball.y = ballOrig.y;
          ballSpeed.x = -ballSpeed.x;
          HUD.addScore1();

      }

      if (ball.y > game.world.height || ball.y < 0) {
          ballSpeed.y = -ballSpeed.y;
      }

    }
    function ai(){
      paddle2.y = ball.y;
    }
    function controlPaddle(paddle, y ){
      paddle.y = y;
    }

    //Public functions
    return{
        init: function(_game) {
            game = _game;
        },
        preload: function() {
          game.load.image('dot', 'assets/img/dot.png');
        },
        create: function() {
           ballOrig = {x: game.world.centerX, y: game.world.centerY };
           game.physics.startSystem(Phaser.Physics.ARCADE);

           paddle1 = createPaddle(20, game.world.centerY);
           paddle2 = createPaddle(game.world.width - 20, game.world.centerY);

           var separator = game.add.sprite(game.world.centerX, 0, 'dot');
           separator.height = 600;
           separator.width = 10;

           ball = game.add.sprite(ballOrig.x, ballOrig.y, 'dot');
           ball.anchor.setTo(0.5, 0.5);
           game.physics.arcade.enable(ball, Phaser.Physics.ARCADE);
        },
        update: function() {
            ai();
            game.physics.arcade.collide(ball, paddle1, paddleCollision, null, this);
            game.physics.arcade.collide(ball, paddle2, paddleCollision, null, this);

            controlPaddle(paddle1 , game.input.y);

            moveBall();
            outOfBounds();
        }
    };
});
