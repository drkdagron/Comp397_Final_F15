var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            createjs.Sound.play("game_over");
            console.log("over state started");
            this.background = new gameobject.World(worldSheet, "world");
            this.addChild(this.background);
            this.gameover = new objects.Label("GAME OVER!!!", "40px Consolas", "#EEE", 400, 150);
            this.addChild(this.gameover);
            this.score = new objects.Label("Your Score: " + pScore.toString(), "24px Consolas", "#EEE", 400, 200);
            this.addChild(this.score);
            this.againButton = new gameobject.UiButton(uiSheet, "restart", 400, 325);
            this.againButton.on("click", this.playAgain, this);
            this.addChild(this.againButton);
            this.backButton = new gameobject.UiButton(uiSheet, "menu", 400, 400);
            this.backButton.on("click", this.backMenu, this);
            this.addChild(this.backButton);
            stage.addChild(this);
        };
        Over.prototype.playAgain = function () {
            pScore = 0;
            changeState(config.PLAY_STATE);
        };
        Over.prototype.backMenu = function () {
            pScore = 0;
            changeState(config.MENU_STATE);
        };
        Over.prototype.update = function () {
        };
        return Over;
    })(objects.Scene);
    states.Over = Over;
})(states || (states = {}));
//# sourceMappingURL=over.js.map