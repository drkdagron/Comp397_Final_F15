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
            this.enemies = [];
            this.bullets = [];
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            console.log("game state started");
            this.world = new gameobject.World(worldSheet, "background");
            this.addChild(this.world);
            this.controlPoint = new gameobject.ControlPoint(controlPointSheet, "controlPoint");
            this.controlPoint.x = Math.floor(Math.random() * 650 + 100);
            this.controlPoint.y = Math.floor(Math.random() * 450 + 100);
            this.addChild(this.controlPoint);
            for (var i = 0; i < 4; i++) {
                this.bullets[i] = new gameobject.Bullet();
                this.addChild(this.bullets[i]);
            }
            for (var i = 0; i < 5; i++) {
                this.enemies[i] = new gameobject.Enemy(enemyNormalSheet, "normal1", 0);
                this.enemies[i].gotoAndPlay("animation");
                this.enemies[i].x = Math.floor(Math.random() * 800);
                this.enemies[i].y = Math.floor(Math.random() * 600);
                this.enemies[i].xDir = Math.random() * 3 - 1;
                this.enemies[i].yDir = Math.random() * 3 - 1;
                this.addChild(this.enemies[i]);
            }
            for (var x = 5; x < 8; x++) {
                var rnd = Math.floor(Math.random() * 4);
                switch (rnd) {
                    case 0:
                        this.enemies[x] = new gameobject.Enemy(enemyFastSheet, "fast1", 1);
                        break;
                    case 1:
                        this.enemies[x] = new gameobject.Enemy(enemySplitSheet, "split1", 2);
                        break;
                    case 2:
                        this.enemies[x] = new gameobject.Enemy(enemyHardenedSheet, "hardened1", 3);
                        break;
                    case 3:
                        this.enemies[x] = new gameobject.Enemy(enemyBossSheet, "boss1", 4);
                }
                this.enemies[x].gotoAndPlay("animation");
                this.enemies[x].x = Math.floor(Math.random() * 800);
                this.enemies[x].y = Math.floor(Math.random() * 600);
                var dirX = Math.random() * 2 - 1;
                var dirY = Math.random() * 2 - 1;
                this.enemies[x].xDir = dirX;
                this.enemies[x].yDir = dirY;
                this.addChild(this.enemies[x]);
            }
            this.player = new gameobject.Player(playerSheet, "ship");
            this.player.setPosition(75, 240);
            this.addChild(this.player);
            this.cpLives = new objects.Label("Computer Lives: " + this.controlPoint.getLives(), "24px Consolas", "#FFF", 125, 20);
            this.addChild(this.cpLives);
            this.pLives = new objects.Label("Ship Lives: " + this.player.getLives(), "24px Consolas", "#FFF", 425, 20);
            this.addChild(this.pLives);
            this.score = new objects.Label("Score: " + this.player.getScore(), "24px Consolas", "#FFF", 675, 20);
            this.addChild(this.score);
            stage.addChild(this);
        };
        Game.prototype.update = function () {
            this.player.update(this.bullets);
            this.controlPoint.update();
            this.checkCollisionBulletEnemy();
            this.checkCollisionEnemyPlayer();
            this.checkCollisionEnemyControlPoint();
            for (var x = 0; x < this.bullets.length; x++) {
                this.bullets[x].update();
            }
            for (var y = 0; y < this.enemies.length; y++) {
                this.enemies[y].update();
            }
            this.cpLives.text = "Computer Lives: " + this.controlPoint.getLives();
            this.pLives.text = "Ship Lives: " + this.player.getLives();
            this.score.text = "Score: " + this.player.getScore();
        };
        Game.prototype.checkCollisionEnemyControlPoint = function () {
            for (var ene = 0; ene < this.enemies.length; ene++) {
                if (this.enemies[ene].typeID == 4) {
                    var edgeX = this.controlPoint.x - this.enemies[ene].x;
                    var edgeY = this.controlPoint.y - this.enemies[ene].y;
                    var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                    if (len < 50 + 50) {
                        this.controlPoint.Kill();
                    }
                }
                else {
                    var edgeX = this.controlPoint.x - this.enemies[ene].x + 25;
                    var edgeY = this.controlPoint.y - this.enemies[ene].y + 25;
                    var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                    if (len < 50 + 25) {
                        this.controlPoint.Hit();
                        this.enemies[ene].Kill();
                    }
                }
            }
        };
        Game.prototype.checkCollisionEnemyPlayer = function () {
            for (var ene = 0; ene < this.enemies.length; ene++) {
                if (this.enemies[ene].typeID == 4) {
                    var edgeX = this.player.x - this.enemies[ene].x;
                    var edgeY = this.player.y - this.enemies[ene].y;
                    var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                    if (len < 25 + 50) {
                        this.player.Kill();
                    }
                }
                else {
                    var edgeX = this.player.x - this.enemies[ene].x + 25;
                    var edgeY = this.player.y - this.enemies[ene].y + 25;
                    var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                    if (len < 25 + 25) {
                        this.enemies[ene].Kill();
                        this.player.Hit();
                        if (this.enemies[ene].typeID == 0) {
                            this.player.addScore(1000);
                        }
                        else {
                            this.player.addScore(1500);
                        }
                    }
                }
            }
        };
        Game.prototype.checkCollisionBulletEnemy = function () {
            for (var bul = 0; bul < this.bullets.length; bul++) {
                for (var ene = 0; ene < this.enemies.length; ene++) {
                    if (this.enemies[ene].typeID == 4) {
                        var edgeX = this.bullets[bul].x - this.enemies[ene].x;
                        var edgeY = this.bullets[bul].y - this.enemies[ene].y;
                        var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                        if (len < 8 + 50) {
                            this.bullets[bul].KillBullet();
                            this.enemies[ene].Hit();
                            if (!this.enemies[ene].getAlive()) {
                                this.player.addScore(2500);
                            }
                        }
                    }
                    else {
                        var edgeX = this.bullets[bul].x - this.enemies[ene].x + 25;
                        var edgeY = this.bullets[bul].y - this.enemies[ene].y + 25;
                        var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                        if (len < 8 + 25) {
                            this.bullets[bul].KillBullet();
                            this.enemies[ene].Hit();
                            if (!this.enemies[ene].getAlive()) {
                                if (this.enemies[ene].typeID == 0) {
                                    this.player.addScore(1000);
                                }
                                else {
                                    this.player.addScore(1500);
                                }
                            }
                        }
                    }
                }
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map