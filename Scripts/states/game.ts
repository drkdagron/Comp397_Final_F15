module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private floor:string = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan..................................................";
        private tileSize: number = 70;
        private startingY: number = canvas.clientHeight - 55;
        
        private world:gameobject.World;
        private player:gameobject.Player;
        
        private enemies: gameobject.Enemy[] = [];
        private coin: gameobject.Bullet[] = [];
        
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
             
            for (var i = 0; i < 4; i++)
            {
                this.coin[i] = new gameobject.Bullet();
                this.addChild(this.coin[i]);
            }
            
            for (var i = 0; i < 10; i++)
            {
                this.enemies[i] = new gameobject.Enemy(enemySheet, "rock1");
                this.enemies[i].x = 10 + i * 50;
                this.enemies[i].y = 0;
                this.enemies[i].xDir = Math.random() * 2 - 1;
                this.enemies[i].yDir = Math.random() * 2 - 1;
                this.addChild(this.enemies[i]);
            }
             
            this.player = new gameobject.Player(playerSheet, "car");
            this.player.setPosition(75, 240);
            this.addChild(this.player);
             
            this.lives = new objects.Label("Lives: " + this.player.getLives(), "30px Consolas", "#FFF", 100, 20);
            this.addChild(this.lives);
            
            this.score = new objects.Label("Score: " + this.player.getScore(), "30px Consolas", "#FFF", 700, 20);
            this.addChild(this.score);
            
            
            stage.addChild(this);
        }

        public update(): void {
            this.player.update(this.coin);
            
            for (var x = 0; x < this.coin.length; x++)
            {
                this.coin[x].update();
            }
            for (var y = 0; y < this.enemies.length; y++)
            {
                this.enemies[y].update();
            }
        }
    }
} 