/*
This is the main entry point of the game
Dependencys: phaser.min.js, Player.js, Level.js and HUD.js
We can use phaser.min with Phaser namespace
*/
requirejs(['module/Pong','module/HUD'],function(Level,HUD){

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update , render: render});

    function preload () {
        Level.init(game);
        Level.preload();

        HUD.init(game);
        HUD.preload();
    }

    function create () {

      HUD.create();
      Level.create();
    }

    function update() {
      Level.update();
    }

    function render() {
       //game.debug.bodyInfo(ball, 16, 24);
    }


});
