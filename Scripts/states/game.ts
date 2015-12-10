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
                this.enemies[i] = new gameobject.Enemy(enemyNormalSheet, "normal1", 0);
                this.enemies[i].gotoAndPlay("animation");
                this.enemies[i].x = Math.floor(Math.random() * 800);
                this.enemies[i].y = Math.floor(Math.random() * 600);
                this.enemies[i].xDir = Math.random() * 3 - 1;
                this.enemies[i].yDir = Math.random() * 3 - 1;
                this.addChild(this.enemies[i]);
            }
            for (var x = 5; x < 8; x++)
            {
                var rnd = Math.floor(Math.random() * 4);
               switch (rnd)
               {
                   case 0:
                    this.enemies[x] = new gameobject.Enemy(enemyFastSheet, "fast1", 1);
                    break;
                   case 1:
                    this.enemies[x] = new gameobject.Enemy(enemySplitSheet, "split1", 2);
                    break;
                   case 2:
                    this.enemies[x] = new gameobject.Enemy(enemyHardenedSheet, "hardened1", 3);
                    break;
                   case 3:
                    this.enemies[x] = new gameobject.Enemy(enemyBossSheet, "boss1", 4);
               }
               this.enemies[x].gotoAndPlay("animation");
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
            
            this.checkCollisionBulletEnemy();
            this.checkCollisionEnemyPlayer();
            this.checkCOllisionEnemyControlPoint();
            
            for (var x = 0; x < this.bullets.length; x++)
            {
                this.bullets[x].update();
            }
            for (var y = 0; y < this.enemies.length; y++)
            {
                this.enemies[y].update();
            }
        }
        
        private checkCOllisionEnemyControlPoint() : void {
            for (var ene = 0; ene < this.enemies.length; ene++)
            {
                var edgeX = this.controlPoint.x + 50 - this.enemies[ene].x + 25;
                var edgeY = this.controlPoint.y + 50 - this.enemies[ene].y + 25;
                var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                
                if (len < 50 + 25)
                {
                    this.controlPoint.Hit();
                    this.enemies[ene].Kill();
                }
            }
        }
        
        private checkCollisionEnemyPlayer() : void {
            for (var ene = 0; ene < this.enemies.length; ene++)
            {
                var l1:number = 25;
                var l2:number = 24;
                var edgeX = this.player.x - this.enemies[ene].x + 25;
                var edgeY = this.player.y - this.enemies[ene].y + 25;
                var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                
                if (len < l1+l2)
                {
                    this.enemies[ene].Kill();
                    this.player.Hit();
                }
            }
        }
        
        private checkCollisionBulletEnemy() : void {
            for (var bul = 0; bul < this.bullets.length; bul++)
            {
                for (var ene = 0; ene < this.enemies.length; ene++)
                {
                    var l1:number = 8; //bullet radius
                    var l2:number = 25;
                    var edgeX = this.bullets[bul].x - this.enemies[ene].x + 25;
                    var edgeY = this.bullets[bul].y - this.enemies[ene].y + 25;
                    var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                    
                    if (len < l1+l2)
                    {
                        this.bullets[bul].KillBullet();
                        this.enemies[ene].Hit();
                    }
                }
            }
        }
    }
} 