var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameobject;
(function (gameobject) {
    var World = (function (_super) {
        __extends(World, _super);
        function World(sheet, tile) {
            _super.call(this, sheet, tile);
            this.moveSpeed = 5;
            this.sizeX = 1920;
            this.sizeY = 480;
            this.frameX = 640;
            this.reset();
        }
        World.prototype.reset = function () {
            this.x = 0;
            this.y = 0;
        };
        World.prototype.update = function () {
            this.x -= this.moveSpeed;
            if (this.x < -(this.sizeX - this.frameX)) {
                this.reset();
            }
        };
        return World;
    })(createjs.Sprite);
    gameobject.World = World;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=world.js.map