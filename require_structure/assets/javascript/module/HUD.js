/*
HUD module
Dependency: null
*/
define(function(){

    //Private variables
    var game = null;
    var score1 = 0, score2 = 0;
    var score1Text = null, score2Text = null;
    var style =  { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    //Public functions
    return{
        init: function(_game) {
          game = _game;
        },
        preload: function() {
          game.load.image('dot', 'assets/img/dot.png');
        },
        create: function() {
          score1Text = game.add.text(game.world.centerX - 50, 50, score1, style);
          score2Text = game.add.text(game.world.centerX + 50, 50, score2, style);
        },
        addScore1: function(value) {
            score1+=1;
            score1Text.text = score1;

        },
        addScore2: function(value) {
            score2+=1;
            score2Text.text = score2;

        }
    };
});
