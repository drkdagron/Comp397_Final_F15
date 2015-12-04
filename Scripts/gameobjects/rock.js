var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameobject;
(function (gameobject) {
    var Rock = (function (_super) {
        __extends(Rock, _super);
        function Rock(sheet, tile, x) {
            _super.call(this, sheet, tile);
            this.moveSpeed = 5;
            this.yBuffer = 20;
            this.resetStart(x);
            this.regX = 40;
            this.regY = 40;
        }
        Rock.prototype.resetStart = function (x) {
            this.x = x;
            this.y = Math.random() * 480 + 1;
        };
        Rock.prototype.reset = function () {
            this.x = 750;
            this.y = Math.random() * 480 + 1;
            if (this.y < 0 + this.yBuffer) {
                this.y = 0 + this.yBuffer;
            }
            else if (this.y > 480 - this.yBuffer) {
                this.y = 480 - this.yBuffer;
            }
            this.rotation = Math.random() * 360 + 1;
        };
        Rock.prototype.update = function () {
            this.x -= this.moveSpeed;
            if (this.x < -100) {
                this.reset();
            }
        };
        return Rock;
    })(createjs.Sprite);
    gameobject.Rock = Rock;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=rock.js.map