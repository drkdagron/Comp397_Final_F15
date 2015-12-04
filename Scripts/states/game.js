var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var states;
(function (states) {
    // GAME CLASS
    var Game = (function (_super) {
        __extends(Game, _super);
        // CONSTRUCTOR
        function Game() {
            _super.call(this);
            // PRIVATE INSTANCE VARIABLES
            this.floor = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan..................................................";
            this.tileSize = 70;
            this.startingY = canvas.clientHeight - 55;
            this.enemies = [];
            this.coin = [];
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            console.log("game state started");
            this.world = new gameobject.World(worldSheet, "background");
            this.addChild(this.world);
            for (var i = 0; i < 4; i++) {
                this.coin[i] = new gameobject.Bullet();
                this.addChild(this.coin[i]);
            }
            for (var i = 0; i < 10; i++) {
                this.enemies[i] = new gameobject.Enemy(enemySheet, "rock1");
                this.enemies[i].x = 10 + i * 50;
                this.enemies[i].y = 0;
                this.enemies[i].xDir = Math.random() * 2 - 1;
                this.enemies[i].yDir = Math.random() * 2 - 1;
                this.addChild(this.enemies[i]);
            }
            this.player = new gameobject.Player(playerSheet, "car");
            this.player.setPosition(75, 240);
            this.addChild(this.player);
            this.lives = new objects.Label("Lives: " + this.player.getLives(), "30px Consolas", "#FFF", 100, 20);
            this.addChild(this.lives);
            this.score = new objects.Label("Score: " + this.player.getScore(), "30px Consolas", "#FFF", 700, 20);
            this.addChild(this.score);
            stage.addChild(this);
        };
        Game.prototype.update = function () {
            this.player.update(this.coin);
            for (var x = 0; x < this.coin.length; x++) {
                this.coin[x].update();
            }
            for (var y = 0; y < this.enemies.length; y++) {
                this.enemies[y].update();
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map