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
            if (!musicPlaying) {
                createjs.Sound.stop();
                createjs.Sound.play("bg_music", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.2, 0);
                musicPlaying = true;
            }
            this.background = new gameobject.World(worldSheet, "background");
            this.addChild(this.background);
            this.title = new objects.Label("1337 Bug Zapperz", "64px Consolas", "#FFFFFF", 400, 150);
            this.addChild(this.title);
            this.instr = new gameobject.UiButton(uiSheet, "instruction", 400, 325);
            this.instr.on("click", this.instruction, this);
            this.addChild(this.instr);
            this.play = new gameobject.UiButton(uiSheet, "play", 400, 400);
            this.play.on("click", this.startGame, this);
            this.addChild(this.play);
            stage.addChild(this);
        };
        Menu.prototype.instruction = function () {
            console.log("Instruction Button Hit");
            changeState(config.INSTRC_STATE);
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