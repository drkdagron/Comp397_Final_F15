var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameobject;
(function (gameobject) {
    var ControlPoint = (function (_super) {
        __extends(ControlPoint, _super);
        function ControlPoint(sheet, frame) {
            _super.call(this, sheet, frame);
            this.alive = false;
            this.lives = 0;
            this.regX = 50;
            this.regY = 50;
        }
        ControlPoint.prototype.Hit = function () {
            if (this.lives > 0) {
                this.lives--;
            }
            else {
                this.alive = false;
                this.x = -100;
                this.y = 100;
            }
        };
        ControlPoint.prototype.update = function () {
            this.rotation += 10;
        };
        return ControlPoint;
    })(createjs.Sprite);
    gameobject.ControlPoint = ControlPoint;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=controlpoint.js.map