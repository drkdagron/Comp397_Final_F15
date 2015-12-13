var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameobject;
(function (gameobject) {
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle() {
            _super.call(this, particleSheet, "part");
            this.moveSpeed = 10;
            this.alive = false;
            this.aliveTimer = 45;
            this.timer = 0;
            this.regX = 4;
            this.regY = 4;
            this.x = -100;
            this.y = -100;
            this.xDir = 0;
            this.yDir = 0;
            this.alive = false;
        }
        Particle.prototype.spawnDirection = function (x, y) {
            this.x = x;
            this.y = y;
            var angle = Math.random() * 360;
            var radian = angle * (Math.PI / 180);
            console.log(this.rotation);
            var eX = Math.cos(radian + Math.PI / 2);
            var eY = Math.sin(radian + Math.PI / 2);
            console.log(eX + "\t" + eY);
            var len = Math.sqrt(eX * eX + eY * eY);
            eX /= len;
            eY /= len;
            this.xDir = eX;
            this.yDir = eY;
            this.alive = true;
            console.log("spawning particle @ " + this.x + ", " + this.y + " moving in direction: " + eX + ", " + eY);
        };
        Particle.prototype.direction = function (x, y) {
            this.xDir = x;
            this.yDir = y;
        };
        Particle.prototype.update = function () {
            if (this.alive == true) {
                this.timer++;
                if (this.timer > this.aliveTimer) {
                    this.alive = false;
                    this.x = -100;
                    this.y = -100;
                    this.timer = 0;
                }
                this.rotation += 60;
                this.x += this.xDir;
                this.y += this.yDir;
            }
        };
        return Particle;
    })(createjs.Sprite);
    gameobject.Particle = Particle;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=particle.js.map