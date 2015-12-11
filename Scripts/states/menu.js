var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // MENU CLASS
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // CONSTRUCTOR
        function Menu() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Menu.prototype.start = function () {
            console.log("menu state started");
            this.background = new gameobject.World(worldSheet, "background");
            this.addChild(this.background);
            this.title = new objects.Label("1337 Bug Zapperz", "36px Consolas", "#FFFFFF", 400, 50);
            this.addChild(this.title);
            this.howTo = new objects.Label("Destroy all the bugs before\n\nthey destroy your control point!", "24px Consolas", "#FFFFFF", 400, 120);
            this.addChild(this.howTo);
            this.play = new gameobject.UiButton(uiSheet, "play", 400, 400);
            this.play.on("click", this.startGame, this);
            this.addChild(this.play);
            stage.addChild(this);
        };
        Menu.prototype.startGame = function () {
            changeState(config.PLAY_STATE);
        };
        Menu.prototype.update = function () {
        };
        return Menu;
    })(objects.Scene);
    states.Menu = Menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map