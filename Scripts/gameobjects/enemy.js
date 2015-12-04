var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameobject;
(function (gameobject) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(sheet, tile) {
            _super.call(this, sheet, tile);
            this.xDir = 0;
            this.yDir = 0;
            this.moveSpeed = 5;
            this.yBuffer = 20;
            this.alive = false;
            this.lives = 0;
            this.regX = 40;
            this.regY = 40;
            this.x = -100;
            this.y = 100;
        }
        Enemy.prototype.move = function (x, y) {
            this.x += x;
            this.y += y;
        };
        Enemy.prototype.Hit = function () {
            if (this.lives > 0) {
                this.lives--;
            }
            else {
                this.alive = false;
                this.x = -100;
                this.y = 100;
            }
        };
        Enemy.prototype.update = function () {
            this.move(this.xDir, this.yDir);
            if (this.x < 0 - 40) {
                this.x = 840;
            }
            if (this.x > 840) {
                this.x = 0 - 40;
            }
            if (this.y > 640) {
                this.y = 0 - 40;
            }
            if (this.y < 0 - 40) {
                this.y = 640;
            }
        };
        return Enemy;
    })(createjs.Sprite);
    gameobject.Enemy = Enemy;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=enemy.js.map