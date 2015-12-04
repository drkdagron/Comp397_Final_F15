module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private floor:string = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan..................................................";
        private tileSize: number = 70;
        private startingY: number = canvas.clientHeight - 55;
        
        private world:gameobject.World;
        private player:gameobject.Player;
        
        private rock: gameobject.Rock[] = [];
        private coin: gameobject.Coin[] = [];
        
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
                this.coin[i] = new gameobject.Coin();
                this.addChild(this.coin[i]);
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
        }
    }
} 