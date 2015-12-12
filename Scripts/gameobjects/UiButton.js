var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameobject;
(function (gameobject) {
    var UiButton = (function (_super) {
        __extends(UiButton, _super);
        function UiButton(sheet, tile, x, y) {
            _super.call(this, sheet, tile);
            this.x = x;
            this.y = y;
            this.regX = 190 * 0.5;
            this.regY = 49 * 0.5;
            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }
        // PRIVATE METHODS
        // Event Handler for mouse over
        UiButton.prototype.overButton = function (event) {
            event.currentTarget.alpha = 0.7;
        };
        // Event Handler for mouse out
        UiButton.prototype.outButton = function (event) {
            event.currentTarget.alpha = 1.0;
        };
        return UiButton;
    })(createjs.Sprite);
    gameobject.UiButton = UiButton;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=UiButton.js.map