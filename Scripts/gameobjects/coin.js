var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameobject;
(function (gameobject) {
    var Coin = (function (_super) {
        __extends(Coin, _super);
        function Coin() {
            _super.call(this, coinSheet, "gold");
            this.moveSpeed = 5;
            this.alive = true;
            this.fired = false;
            this.aliveTimer = 400;
            this.timer = 0;
            this.regX = 20;
            this.regY = 20;
            this.x = -100;
            this.y = -100;
            this.xDir = 0;
            this.yDir = 0.1;
            this.alive = true;
        }
        Coin.prototype.update = function () {
            if (this.alive == true && this.fired == true) {
                this.x += this.xDir * this.moveSpeed;
                this.y += this.yDir * this.moveSpeed;
                this.rotation += 0.5;
            }
            else if (this.alive == false) {
            }
        };
        return Coin;
    })(createjs.Sprite);
    gameobject.Coin = Coin;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=coin.js.map