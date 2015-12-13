var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameobject;
(function (gameobject) {
    var ControlPoint = (function (_super) {
        __extends(ControlPoint, _super);
        function ControlPoint(sheet, frame) {
            _super.call(this, sheet, frame);
            this.alive = false;
            this.lives = 5;
            this.regX = 50;
            this.regY = 50;
        }
        ControlPoint.prototype.Hit = function () {
            if (this.lives > 0) {
                this.lives--;
            }
            if (this.lives == 0) {
                this.alive = false;
                this.x = -100;
                this.y = 100;
            }
        };
        ControlPoint.prototype.Kill = function () {
            this.lives = 0;
            this.alive = false;
            this.x = -100;
            this.y = 100;
        };
        ControlPoint.prototype.getLives = function () {
            return this.lives;
        };
        ControlPoint.prototype.setLives = function (lives) {
            this.lives = lives;
        };
        ControlPoint.prototype.update = function () {
            this.rotation += 10;
        };
        return ControlPoint;
    })(createjs.Sprite);
    gameobject.ControlPoint = ControlPoint;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=controlpoint.js.map