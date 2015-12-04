var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            this.normalEnemies = [];
            this.fastEnemies = [];
            this.bullets = [];
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            console.log("game state started");
            this.world = new gameobject.World(worldSheet, "background");
            this.addChild(this.world);
            for (var i = 0; i < 4; i++) {
                this.bullets[i] = new gameobject.Bullet();
                this.addChild(this.bullets[i]);
            }
            for (var i = 0; i < 5; i++) {
                this.normalEnemies[i] = new gameobject.Enemy(enemySheet, "normal");
                this.normalEnemies[i].x = Math.floor(Math.random() * 800);
                this.normalEnemies[i].y = Math.floor(Math.random() * 600);
                this.normalEnemies[i].xDir = Math.random() * 3 - 1;
                this.normalEnemies[i].yDir = Math.random() * 3 - 1;
                this.addChild(this.normalEnemies[i]);
            }
            for (var i = 0; i < 3; i++) {
                this.fastEnemies[i] = new gameobject.Enemy(enemySheet, "fast");
                this.fastEnemies[i].x = 10 + i * 50;
                this.fastEnemies[i].y = 300;
                this.fastEnemies[i].xDir = Math.random() * 3 - 1;
                this.fastEnemies[i].yDir = Math.random() * 3 - 1;
                this.addChild(this.fastEnemies[i]);
            }
            this.player = new gameobject.Player(playerSheet, "ship");
            this.player.setPosition(75, 240);
            this.addChild(this.player);
            this.lives = new objects.Label("Lives: " + this.player.getLives(), "30px Consolas", "#FFF", 100, 20);
            this.addChild(this.lives);
            this.score = new objects.Label("Score: " + this.player.getScore(), "30px Consolas", "#FFF", 700, 20);
            this.addChild(this.score);
            stage.addChild(this);
        };
        Game.prototype.update = function () {
            this.player.update(this.bullets);
            for (var x = 0; x < this.bullets.length; x++) {
                this.bullets[x].update();
            }
            for (var y = 0; y < this.normalEnemies.length; y++) {
                this.normalEnemies[y].update();
            }
            for (var y = 0; y < this.fastEnemies.length; y++) {
                this.fastEnemies[y].update();
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map