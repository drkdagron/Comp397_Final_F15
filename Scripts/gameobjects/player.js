var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameobject;
(function (gameobject) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(sheet, frame) {
            _super.call(this, sheet, frame);
            this.speed = 6;
            this.defaultTurnRate = 3.5;
            this.lives = 3;
            this.score = 0;
            this.coins = [];
            this.firing = false;
            this.fireTimer = 0;
            this.fireRate = 15;
            this.setBounds(0, 0, 50, 38);
            this.regX = 50 / 2;
            this.regY = 38 / 2;
            window.onkeydown = this.keyPressed;
            window.onkeyup = this.keyReleased;
        }
        Player.prototype.keyPressed = function (event) {
            switch (event.keyCode) {
                case 32:
                    config.FIRING = true;
                    break;
                case 37:
                case 65:
                    config.MOVE_LEFT = true;
                    break;
                case 87:
                case 38:
                    config.MOVE_UP = true;
                    break;
                case 39:
                case 68:
                    config.MOVE_RIGHT = true;
                    break;
                case 40:
                case 83:
                    config.MOVE_DOWN = true;
                    break;
            }
        };
        Player.prototype.keyReleased = function (event) {
            switch (event.keyCode) {
                case 32:
                    config.FIRING = false;
                    break;
                case 37:
                case 65:
                    config.MOVE_LEFT = false;
                    break;
                case 38:
                case 87:
                    config.MOVE_UP = false;
                    break;
                case 39:
                case 68:
                    config.MOVE_RIGHT = false;
                    break;
                case 40:
                case 83:
                    config.MOVE_DOWN = false;
                    break;
            }
        };
        Player.prototype.faceMouse = function () {
            var x = stage.mouseX;
            var y = stage.mouseY;
            var edgeX = x - this.x;
            var edgeY = y - this.y;
            var rotateValue = (Math.atan2(edgeY, edgeX) * (180 / Math.PI)) + 90;
            this.rotation = rotateValue;
        };
        Player.prototype.rotate = function (v) {
            this.rotation += v;
        };
        Player.prototype.Hit = function () {
            this.lives--;
        };
        Player.prototype.Kill = function () {
            this.lives = 0;
            this.x = -100;
            this.y = 100;
        };
        Player.prototype.move = function (x) {
            var radian = this.rotation * (Math.PI / 180);
            //console.log(this.rotation);
            var eX = Math.cos(radian + Math.PI / 2);
            var eY = Math.sin(radian + Math.PI / 2);
            //console.log(eX + "\t" + eY);
            this.x -= eX * x;
            this.y -= eY * x;
        };
        Player.prototype.addScore = function (add) {
            this.score += add;
        };
        Player.prototype.setScore = function (num) {
            this.score = num;
        };
        Player.prototype.getScore = function () {
            return this.score;
        };
        Player.prototype.playerHit = function () {
            this.lives--;
        };
        Player.prototype.getLives = function () {
            return this.lives;
        };
        Player.prototype.Bang = function (coin) {
            var radian = this.rotation * (Math.PI / 180);
            var eX = Math.cos(radian + Math.PI / 2);
            var eY = Math.sin(radian + Math.PI / 2);
            var edgeX = eX;
            var edgeY = eY;
            var norm = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
            edgeX /= -norm;
            edgeY /= -norm;
            for (var i = 0; i < coin.length; i++) {
                if (coin[i].alive == false && coin[i].fired == false) {
                    coin[i].timer = 0;
                    coin[i].direction(edgeX, edgeY);
                    coin[i].alive = true;
                    coin[i].fired = true;
                    coin[i].x = this.x;
                    coin[i].y = this.y;
                    this.fireTimer = 0;
                    createjs.Sound.play("bullet");
                    return;
                }
            }
            console.log("BANG");
        };
        Player.prototype.update = function (coin) {
            //this.faceMouse();
            this.fireTimer++;
            if (this.fireTimer > this.fireRate) {
                this.firing = true;
            }
            else
                this.firing = false;
            if (config.FIRING && this.firing) {
                this.Bang(coin);
            }
            if (config.MOVE_LEFT) {
                this.rotate(-6);
            }
            if (config.MOVE_RIGHT) {
                this.rotate(6);
            }
            if (config.MOVE_UP) {
                this.move(this.speed);
            }
            if (config.MOVE_DOWN) {
                this.move(-this.speed);
            }
            if (this.x < 10) {
                this.x = 10;
            }
            if (this.y < 10) {
                this.y = 10;
            }
            if (this.y > 590) {
                this.y = 590;
            }
            if (this.x > 790) {
                this.x = 790;
            }
        };
        Player.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
        };
        return Player;
    })(createjs.Sprite);
    gameobject.Player = Player;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=player.js.map