var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameobject;
(function (gameobject) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(sheet, frame, type) {
            _super.call(this, sheet, frame);
            this.xDir = 0;
            this.yDir = 0;
            this.moveSpeed = 2;
            this.yBuffer = 20;
            this.alive = false;
            this.lives = 0;
            this.type = "normal";
            this.typeID = 0; //0 - normal, 1 - fast, 2 - heavy, 3 - split, 4 - boss
            this.regX = 50;
            this.regY = 50;
            this.lives = 3;
            this.typeID = type;
            switch (this.typeID) {
                case 1:
                    //fast moving enemy
                    this.moveSpeed = 4;
                    this.lives = 1;
                    break;
                case 2:
                    //split
                    break;
                case 3:
                    //hardened/heavy enemy
                    this.moveSpeed = 1;
                    this.lives = 5;
                    break;
                case 4:
                    //boss
                    this.lives = 10;
            }
        }
        Enemy.prototype.move = function (x, y) {
            this.x += x * this.moveSpeed;
            this.y += y * this.moveSpeed;
        };
        Enemy.prototype.Hit = function () {
            if (this.lives > 0) {
                this.lives--;
            }
            else {
                this.alive = false;
                this.x = -100;
                this.y = 100;
            }
        };
        Enemy.prototype.update = function () {
            this.move(this.xDir, this.yDir);
            if (this.x < 0 - 40) {
                this.x = 840;
            }
            if (this.x > 840) {
                this.x = 0 - 40;
            }
            if (this.y > 640) {
                this.y = 0 - 40;
            }
            if (this.y < 0 - 40) {
                this.y = 640;
            }
        };
        return Enemy;
    })(createjs.Sprite);
    gameobject.Enemy = Enemy;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=enemy.js.map