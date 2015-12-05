module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private floor:string = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan..................................................";
        private tileSize: number = 70;
        private startingY: number = canvas.clientHeight - 55;
        
        private world:gameobject.World;
        private player:gameobject.Player;
        private controlPoint: gameobject.ControlPoint;
        
        private enemies: gameobject.Enemy[] = [];
        private bullets: gameobject.Bullet[] = [];
        
        private lives: objects.Label;
        private score: objects.Label;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            console.log("game state started");
            
            this.world = new gameobject.World(worldSheet, "background");
            this.addChild(this.world);
            
            this.controlPoint = new gameobject.ControlPoint(controlPointSheet, "controlPoint");
            this.controlPoint.x = Math.floor(Math.random() * 650 + 100);
            this.controlPoint.y = Math.floor(Math.random() * 450 + 100);
            this.addChild(this.controlPoint);
             
            for (var i = 0; i < 4; i++)
            {
                this.bullets[i] = new gameobject.Bullet();
                this.addChild(this.bullets[i]);
            }
            
            for (var i = 0; i < 5; i++)
            {                
                this.enemies[i] = new gameobject.Enemy(enemySheet, "normal", 0);
                this.enemies[i].x = Math.floor(Math.random() * 800);
                this.enemies[i].y = Math.floor(Math.random() * 600);
                this.enemies[i].xDir = Math.random() * 3 - 1;
                this.enemies[i].yDir = Math.random() * 3 - 1;
                this.addChild(this.enemies[i]);
            }
            for (var x = 5; x < 8; x++)
            {
                var rnd = Math.floor(Math.random() * 3);
               switch (rnd)
               {
                   case 0:
                    this.enemies[x] = new gameobject.Enemy(enemySheet, "fast", 1);
                    break;
                   case 1:
                    this.enemies[x] = new gameobject.Enemy(enemySheet, "split", 2);
                    break;
                   case 2:
                    this.enemies[x] = new gameobject.Enemy(enemySheet, "hardened", 3);
               }
               this.enemies[x].x = Math.floor(Math.random() * 800);
                this.enemies[x].y = Math.floor(Math.random() * 600);
                var dirX = Math.random() * 2 - 1;
                var dirY = Math.random() * 2 - 1;
                this.enemies[x].xDir = dirX;
                this.enemies[x].yDir = dirY;
                this.addChild(this.enemies[x]);
            }
                       
            this.player = new gameobject.Player(playerSheet, "ship");
            this.player.setPosition(75, 240);
            this.addChild(this.player);
             
            this.lives = new objects.Label("Lives: " + this.player.getLives(), "30px Consolas", "#FFF", 100, 20);
            this.addChild(this.lives);
            
            this.score = new objects.Label("Score: " + this.player.getScore(), "30px Consolas", "#FFF", 700, 20);
            this.addChild(this.score);
            
            
            stage.addChild(this);
        }

        public update(): void {
            this.player.update(this.bullets);
            this.controlPoint.update();
            
            for (var x = 0; x < this.bullets.length; x++)
            {
                this.bullets[x].update();
            }
            for (var y = 0; y < this.enemies.length; y++)
            {
                this.enemies[y].update();
            }
            
            
            
        }
    }
} 