var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var states;
(function (states) {
    // OVER CLASS
    var Over = (function (_super) {
        __extends(Over, _super);
        // CONSTRUCTOR
        function Over() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Over.prototype.start = function () {
            createjs.Sound.stop();
            console.log("over state started");
            this.background = new gameobject.World(worldSheet, "world");
            this.addChild(this.background);
            this.gameover = new objects.Label("GAME OVER!!!", "40px Consolas", "#222", 320, 125);
            this.addChild(this.gameover);
            this.score = new objects.Label("Your Score: " + score.toString(), "24px Consolas", "#222", 320, 180);
            this.addChild(this.score);
            this.againButton = new gameobject.UiButton(uiSheet, "restart", 320, 300);
            this.againButton.on("click", this.playAgain, this);
            this.addChild(this.againButton);
            this.backButton = new gameobject.UiButton(uiSheet, "menu", 320, 380);
            this.backButton.on("click", this.backMenu, this);
            this.addChild(this.backButton);
            stage.addChild(this);
        };
        Over.prototype.playAgain = function () {
            changeState(config.PLAY_STATE);
        };
        Over.prototype.backMenu = function () {
            changeState(config.MENU_STATE);
        };
        Over.prototype.update = function () {
            this.background.update();
        };
        return Over;
    })(objects.Scene);
    states.Over = Over;
})(states || (states = {}));
//# sourceMappingURL=over.js.map