var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var states;
(function (states) {
    // MENU CLASS
    var Instruction = (function (_super) {
        __extends(Instruction, _super);
        // CONSTRUCTOR
        function Instruction() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Instruction.prototype.start = function () {
            console.log("menu state started");
            this.background = new gameobject.World(worldSheet, "background");
            this.addChild(this.background);
            this.title = new objects.Label("How to play:", "36px Consolas", "#FFFFFF", 400, 50);
            this.addChild(this.title);
            this.howTo = new objects.Label("A/D - Rotate ship\n\nW - Move Forward\n\nS - Move Backward\n\nSpace - Fire Weapon", "24px Consolas", "#FFFFFF", 400, 150);
            this.addChild(this.howTo);
            this.howTo2 = new objects.Label("Destroy the enemy bugs before they\n\ndestroy your control point", "24px Consolas", "#FFFFFF", 400, 275);
            this.addChild(this.howTo2);
            this.back = new gameobject.UiButton(uiSheet, "back", 400, 500);
            this.back.on("click", this.startGame, this);
            this.addChild(this.back);
            stage.addChild(this);
        };
        Instruction.prototype.startGame = function () {
            changeState(config.MENU_STATE);
        };
        Instruction.prototype.update = function () {
        };
        return Instruction;
    })(objects.Scene);
    states.Instruction = Instruction;
})(states || (states = {}));
//# sourceMappingURL=instruction.js.map