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
        
        private normalEnemies: gameobject.Enemy[] = [];
        private fastEnemies: gameobject.Enemy[] = [];
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
                this.normalEnemies[i] = new gameobject.Enemy(enemySheet, "normal");
                this.normalEnemies[i].x = Math.floor(Math.random() * 800);
                this.normalEnemies[i].y = Math.floor(Math.random() * 600);
                this.normalEnemies[i].xDir = Math.random() * 3 - 1;
                this.normalEnemies[i].yDir = Math.random() * 3 - 1;
                this.addChild(this.normalEnemies[i]);
            }
            
            for (var i = 0; i < 3; i++)
            {
                this.fastEnemies[i] = new gameobject.Enemy(enemySheet, "fast");
                this.fastEnemies[i].x = 10 + i * 50;
                this.fastEnemies[i].y = 300;
                this.fastEnemies[i].xDir = Math.random() * 3 - 1;
                this.fastEnemies[i].yDir = Math.random() * 3 - 1;
                this.addChild(this.fastEnemies[i]);
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
            for (var y = 0; y < this.normalEnemies.length; y++)
            {
                this.normalEnemies[y].update();
            }
            for (var y = 0; y < this.fastEnemies.length; y++)
            {
                this.fastEnemies[y].update();
            }
        }
    }
} 