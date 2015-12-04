var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameobject;
(function (gameobject) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(sheet, frame) {
            _super.call(this, sheet, frame);
            this.speed = 3;
            this.defaultTurnRate = 3.5;
            this.lives = 3;
            this.score = 0;
            this.coins = [];
            this.firing = false;
            this.fireTimer = 0;
            this.fireRate = 30;
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
        Player.prototype.move = function (x, y) {
            this.x += x;
            this.y += y;
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
            var x = stage.mouseX;
            var y = stage.mouseY;
            var edgeX = this.x - x;
            var edgeY = this.y - y;
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
                    return;
                }
            }
            console.log("BANG");
        };
        Player.prototype.update = function (coin) {
            this.faceMouse();
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
                this.move(-this.speed, 0);
            }
            if (config.MOVE_RIGHT) {
                this.move(this.speed, 0);
            }
            if (config.MOVE_UP) {
                this.move(0, -this.speed);
            }
            if (config.MOVE_DOWN) {
                this.move(0, this.speed);
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