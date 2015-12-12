var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameobject;
(function (gameobject) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet() {
            _super.call(this, bulletSheet, "norton");
            this.moveSpeed = 10;
            this.alive = false;
            this.fired = false;
            this.aliveTimer = 60;
            this.timer = 0;
            this.regX = 8;
            this.regY = 8;
            this.x = -100;
            this.y = -100;
            this.xDir = 0;
            this.yDir = 0.1;
            this.alive = false;
        }
        Bullet.prototype.direction = function (x, y) {
            this.xDir = x;
            this.yDir = y;
        };
        Bullet.prototype.KillBullet = function () {
            this.timer = this.aliveTimer;
            this.alive = false;
        };
        Bullet.prototype.update = function () {
            this.timer++;
            if (this.timer > this.aliveTimer) {
                this.alive = false;
                this.fired = false;
                this.x = -100;
                this.y = -100;
            }
            if (this.alive == true && this.fired == true) {
                this.x += this.xDir * this.moveSpeed;
                this.y += this.yDir * this.moveSpeed;
            }
            this.rotation += 60;
        };
        return Bullet;
    })(createjs.Sprite);
    gameobject.Bullet = Bullet;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=bullet.js.map