module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private floor:string = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan..................................................";
        private tileSize: number = 70;
        private startingY: number = canvas.clientHeight - 55;
        
        private world:gameobject.World;
        private player:gameobject.Player;
        private shipLives: number = 3;
        private compLives: number = 5;
        
        private controlPoints: gameobject.ControlPoint[] = [];
        private enemies: gameobject.Enemy[] = [];
        private splitStart;
        private bullets: gameobject.Bullet[] = [];
        
        private particles: gameobject.Particle[] = [];
        
        private cLives: objects.Label;
        private pLives: objects.Label;
        private score: objects.Label;
        
        private stageTimeout = 90;
        private stageTimer = 0;
        
        private spawnSide: number; // 1 = left, 2 = top, 3 = right, 4 = bottom

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            console.log("game state started");
            
            if (!musicPlaying)
            {
                 createjs.Sound.stop();
                 createjs.Sound.play("bg_music", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.2, 0);
                 musicPlaying = true;
            }
            
            this.world = new gameobject.World(worldSheet, "background");
            this.addChild(this.world);
            
            for (var i = 0; i < CONTROL_POINT_COUNT; i++)
            {
                this.controlPoints[i] = new gameobject.ControlPoint(controlPointSheet, "controlPoint");
                this.controlPoints[i].x = Math.floor(Math.random() * 550 + 125);
                this.controlPoints[i].y = Math.floor(Math.random() * 350 + 125);
                this.addChild(this.controlPoints[i]);
            }
            
            for (var i = 0; i < 24; i++)
            {
                this.particles[i] = new gameobject.Particle();
                this.addChild(this.particles[i]);
            }
             
            for (var i = 0; i < 5; i++)
            {
                this.bullets[i] = new gameobject.Bullet();
                this.addChild(this.bullets[i]);
            }
            NORMAL_ENEMY_COUNT = 3;
            SPECIAL_ENEMY_COUNT = 2;
            CURRENT_LEVEL = 0;
            
            this.splitStart = NORMAL_ENEMY_COUNT + SPECIAL_ENEMY_COUNT;
            
            for (var i = 0; i < NORMAL_ENEMY_COUNT; i++)
            {                
                this.spawnSide = Math.floor(Math.random() * 3 + 1);
                this.enemies[i] = new gameobject.Enemy(enemyNormalSheet, "normal1", 0);
                this.enemies[i].gotoAndPlay("animation");
                if (this.spawnSide == 1)
                {
                    this.enemies[i].x = Math.floor(Math.random() * 50 + 25);
                    this.enemies[i].y = Math.floor(Math.random() * 550 + 25);
                    this.enemies[i].xDir = Math.random() * 2 - 1;
                    this.enemies[i].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[i]);
                }
                else if (this.spawnSide == 2)
                {
                    this.enemies[i].x = Math.floor(Math.random() * 750 + 25);
                    this.enemies[i].y = Math.floor(Math.random() * 50 + 25);
                    this.enemies[i].xDir = Math.random() * 2 - 1;
                    this.enemies[i].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[i]);
                }
                else if (this.spawnSide == 3)
                {
                    this.enemies[i].x = Math.floor(Math.random() * 25 + 750);
                    this.enemies[i].y = Math.floor(Math.random() * 550 + 25);
                    this.enemies[i].xDir = Math.random() * 2 - 1;
                    this.enemies[i].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[i]);
                }
                else
                {
                    this.enemies[i].x = Math.floor(Math.random() * 750 + 25);
                    this.enemies[i].y = Math.floor(Math.random() * 25 + 550);
                    this.enemies[i].xDir = Math.random() * 2 - 1;
                    this.enemies[i].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[i]);
                }
                
            }
            for (var x = NORMAL_ENEMY_COUNT; x < NORMAL_ENEMY_COUNT + SPECIAL_ENEMY_COUNT; x++)
            {
                var rnd = Math.floor(Math.random() * 3);
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
                   case 3:
                    this.enemies[x] = new gameobject.Enemy(enemyBossSheet, "boss1", 4);
               }
                this.spawnSide = Math.floor(Math.random() * 3 + 1);
               this.enemies[x].gotoAndPlay("animation");
                 if (this.spawnSide == 1)
                {
                    this.enemies[x].x = Math.floor(Math.random() * 50 + 25);
                    this.enemies[x].y = Math.floor(Math.random() * 550 + 25);
                    this.enemies[x].xDir = Math.random() * 2 - 1;
                    this.enemies[x].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[x]);
                }
                else if (this.spawnSide == 2)
                {
                    this.enemies[x].x = Math.floor(Math.random() * 750 + 25);
                    this.enemies[x].y = Math.floor(Math.random() * 50 + 25);
                    this.enemies[x].xDir = Math.random() * 2 - 1;
                    this.enemies[x].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[x]);
                }
                else if (this.spawnSide == 3)
                {
                    this.enemies[x].x = Math.floor(Math.random() * 25 + 750);
                    this.enemies[x].y = Math.floor(Math.random() * 550 + 25);
                    this.enemies[x].xDir = Math.random() * 2 - 1;
                    this.enemies[x].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[x]);
                }
                else
                {
                    this.enemies[x].x = Math.floor(Math.random() * 750 + 25);
                    this.enemies[x].y = Math.floor(Math.random() * 25 + 550);
                    this.enemies[x].xDir = Math.random() * 2 - 1;
                    this.enemies[x].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[x]);
                }
            }
                       
            this.player = new gameobject.Player(playerSheet, "ship");
            this.player.setPosition(400, 300);
            this.addChild(this.player);
                
            this.cLives = new objects.Label("Computer Lives: " + this.compLives, "24px Consolas", "#FFF", 135, 20);
            this.addChild(this.cLives);
            
            this.pLives = new objects.Label("Ship Lives: " + this.shipLives, "24px Consolas", "#FFF", 435, 20)
            this.addChild(this.pLives);
            
            this.score = new objects.Label("Score: " + pScore.toString(), "24px Consolas", "#FFF", 675, 20);
            this.addChild(this.score);
            
            
            stage.addChild(this);
        }
        
        public nextLevel(): void {
            console.log("game state started");
            
            this.world = new gameobject.World(worldSheet, "background");
            this.addChild(this.world);
            
            for (var i = 0; i < CONTROL_POINT_COUNT; i++)
            {
                this.controlPoints[i] = new gameobject.ControlPoint(controlPointSheet, "controlPoint");
                this.controlPoints[i].x = Math.floor(Math.random() * 550 + 125);
                this.controlPoints[i].y = Math.floor(Math.random() * 350 + 125);
                this.addChild(this.controlPoints[i]);
            }
            
            for (var i = 0; i < 24; i++)
            {
                this.particles[i] = new gameobject.Particle();
                this.addChild(this.particles[i]);
            }
             
            for (var i = 0; i < 5; i++)
            {
                this.bullets[i] = new gameobject.Bullet();
                this.addChild(this.bullets[i]);
            }
            
            this.splitStart = NORMAL_ENEMY_COUNT + SPECIAL_ENEMY_COUNT;
            
            for (var i = 0; i < NORMAL_ENEMY_COUNT; i++)
            {                
                this.spawnSide = Math.floor(Math.random() * 3 + 1);
                this.enemies[i] = new gameobject.Enemy(enemyNormalSheet, "normal1", 0);
                this.enemies[i].gotoAndPlay("animation");
               if (this.spawnSide == 1)
                {
                    this.enemies[i].x = Math.floor(Math.random() * 50 + 25);
                    this.enemies[i].y = Math.floor(Math.random() * 550 + 25);
                    this.enemies[i].xDir = Math.random() * 2 - 1;
                    this.enemies[i].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[i]);
                }
                else if (this.spawnSide == 2)
                {
                    this.enemies[i].x = Math.floor(Math.random() * 750 + 25);
                    this.enemies[i].y = Math.floor(Math.random() * 50 + 25);
                    this.enemies[i].xDir = Math.random() * 2 - 1;
                    this.enemies[i].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[i]);
                }
                else if (this.spawnSide == 3)
                {
                    this.enemies[i].x = Math.floor(Math.random() * 25 + 750);
                    this.enemies[i].y = Math.floor(Math.random() * 550 + 25);
                    this.enemies[i].xDir = Math.random() * 2 - 1;
                    this.enemies[i].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[i]);
                }
                else
                {
                    this.enemies[i].x = Math.floor(Math.random() * 750 + 25);
                    this.enemies[i].y = Math.floor(Math.random() * 25 + 550);
                    this.enemies[i].xDir = Math.random() * 2 - 1;
                    this.enemies[i].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[i]);
                }
            }
            for (var x = NORMAL_ENEMY_COUNT; x < NORMAL_ENEMY_COUNT + SPECIAL_ENEMY_COUNT; x++)
            {
                var rnd = Math.floor(Math.random() * 3);
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
                   case 3:
                    this.enemies[x] = new gameobject.Enemy(enemyBossSheet, "boss1", 4);
               }
                this.spawnSide = Math.floor(Math.random() * 3 + 1);
               this.enemies[x].gotoAndPlay("animation");
               if (this.spawnSide == 1)
                {
                    this.enemies[x].x = Math.floor(Math.random() * 50 + 25);
                    this.enemies[x].y = Math.floor(Math.random() * 550 + 25);
                    this.enemies[x].xDir = Math.random() * 2 - 1;
                    this.enemies[x].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[x]);
                }
                else if (this.spawnSide == 2)
                {
                    this.enemies[x].x = Math.floor(Math.random() * 750 + 25);
                    this.enemies[x].y = Math.floor(Math.random() * 50 + 25);
                    this.enemies[x].xDir = Math.random() * 2 - 1;
                    this.enemies[x].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[x]);
                }
                else if (this.spawnSide == 3)
                {
                    this.enemies[x].x = Math.floor(Math.random() * 25 + 750);
                    this.enemies[x].y = Math.floor(Math.random() * 550 + 25);
                    this.enemies[x].xDir = Math.random() * 2 - 1;
                    this.enemies[x].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[x]);
                }
                else
                {
                    this.enemies[x].x = Math.floor(Math.random() * 750 + 25);
                    this.enemies[x].y = Math.floor(Math.random() * 25 + 550);
                    this.enemies[x].xDir = Math.random() * 2 - 1;
                    this.enemies[x].yDir = Math.random() * 2 - 1;
                    this.addChild(this.enemies[x]);
                }
            }
                       
            this.player = new gameobject.Player(playerSheet, "ship");
            this.player.setPosition(400, 300);
            this.addChild(this.player);
                
            this.cLives = new objects.Label("Computer Lives: " + this.compLives, "24px Consolas", "#FFF", 135, 20);
            this.addChild(this.cLives);
            
            this.pLives = new objects.Label("Ship Lives: " + this.shipLives, "24px Consolas", "#FFF", 435, 20)
            this.addChild(this.pLives);
            
            this.score = new objects.Label("Score: " + pScore.toString(), "24px Consolas", "#FFF", 675, 20);
            this.addChild(this.score);
            
            
            stage.addChild(this);
            
            
        }

        public spawnParticles(x:number, y:number)
        {
            var count = 0;
            for (var q = 0; q < this.particles.length; q++)
            {
                if (this.particles[q].alive == false)
                {
                    this.particles[q].spawnDirection(x, y);
                    count++;
                    
                    if (count > 4)
                        return;
                }
            }
        }

        public update(): void {
            this.stageTimer++
            
            if (this.stageTimer > this.stageTimeout)
            {
                
                this.player.update(this.bullets);
                
                this.checkCollisionBulletEnemy();
                this.checkCollisionEnemyPlayer();
                this.checkCollisionEnemyControlPoint();
                
                for (var p = 0; p < this.particles.length; p++)
                {
                    this.particles[p].update();
                }
                for (var x = 0; x < this.bullets.length; x++)
                {
                    this.bullets[x].update();
                }
                for (var y = 0; y < this.enemies.length; y++)
                {
                    this.enemies[y].update();
                    if (this.enemies[y].diving)
                    {
                        var ctlP = this.findClosestControlPoint(this.enemies[y].x, this.enemies[y].y);
                        var edgeX = this.enemies[y].x - this.controlPoints[ctlP].x;
                        var edgeY = this.enemies[y].y - this.controlPoints[ctlP].y;
                        var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                        edgeX /= len;
                        edgeY /= len;
                        this.enemies[y].xDir = -edgeX;
                        this.enemies[y].yDir = -edgeY;
                    }
                }
                for (var z = 0; z < this.controlPoints.length; z++)
                {
                    this.controlPoints[z].update();
                }
                
                if (this.compLives <= 0 || this.shipLives <= 0)
                {
                    CURRENT_LEVEL = 0;
                    CONTROL_POINT_COUNT = 1;
                    NORMAL_ENEMY_COUNT = 3;
                    SPECIAL_ENEMY_COUNT = 2;
                    this.stage.removeAllChildren();
                    changeState(config.OVER_STATE);
                }
                else
                {
                    this.cLives.text = "Computer Lives: " + this.compLives;
                    this.pLives.text = "Ship Lives: " + this.shipLives;
                    this.score.text = "Score: " + pScore.toString();
                }
                
                if (this.allEnemiesDestroyed())
                {    
                        //add level reset here
                        createjs.Sound.play("next_level");
                        CURRENT_LEVEL++;
                            if (CURRENT_LEVEL % 3 == 0)
                            {
                                CONTROL_POINT_COUNT++;
                                NORMAL_ENEMY_COUNT = 3;
                                SPECIAL_ENEMY_COUNT = 2;
                            }
                            else
                            {
                                NORMAL_ENEMY_COUNT++;
                                SPECIAL_ENEMY_COUNT++;
                            }
                        
                        this.stage.removeAllChildren();
                        this.stageTimer = 0;
                        this.nextLevel();
                    
                }
            }
        }
        
        private findClosestControlPoint(x:number, y:number): number {
            var num: number = 0;
            var min: number = 100000000;
            
            for (var ctl = 0; ctl < this.controlPoints.length; ctl++)
            {
                var edgeX = this.controlPoints[ctl].x - x;
                var edgeY = this.controlPoints[ctl].y - y;
                var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                
                if (len < min)
                {
                    num = ctl;
                    min = len;
                }
            }
            
            return num;
        }
        
        private allEnemiesDestroyed() : boolean {
            for (var ene2 = 0; ene2 < this.enemies.length; ene2++)
            {
                if (this.enemies[ene2].getAlive() == true)
                return false;
            }
            
            return true;
        }
        
        private checkCollisionEnemyControlPoint() : void {
            for (var ene = 0; ene < this.enemies.length; ene++)
            {
                for (var cp = 0; cp < this.controlPoints.length; cp++)
                {
                    if (this.enemies[ene].typeID == 4)
                    {
                        var edgeX = this.controlPoints[cp].x - this.enemies[ene].x;
                        var edgeY = this.controlPoints[cp].y - this.enemies[ene].y;
                        var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                    
                        if (len < 50 + 50)
                        {
                            this.compLives -= 2;
                            this.enemies[ene].Kill();
                            createjs.Sound.play("hit");                  
                        }
                    }
                    else
                    {
                        var edgeX = this.controlPoints[cp].x - this.enemies[ene].x + 25;
                        var edgeY = this.controlPoints[cp].y - this.enemies[ene].y + 25;
                        var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                    
                        if (len < 50 + 25)
                        {
                            this.compLives--;
                            this.controlPoints[cp].Hit();
                            this.enemies[ene].Kill();  
                            createjs.Sound.play("hit");                  
                        }
                    }
                }
                
            }
        }
        
        private checkCollisionEnemyPlayer() : void {
            for (var ene = 0; ene < this.enemies.length; ene++)
            {
                if (this.enemies[ene].typeID == 4)
                {
                    var edgeX = this.player.x - this.enemies[ene].x;
                    var edgeY = this.player.y - this.enemies[ene].y;
                    var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                    
                    if (len < 25 + 50)
                    {
                        this.spawnParticles(oldX, oldY);
                        this.shipLives -= 2;
                        this.enemies[ene].Kill();
                        createjs.Sound.play("enemy_death");
                        pScore += 2500;
                    }
                }
                else
                {
                    var edgeX = this.player.x - this.enemies[ene].x + 25;
                    var edgeY = this.player.y - this.enemies[ene].y + 25;
                    var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                    
                    if (len < 25+25)
                    {
                        var oldX, oldY;
                        oldX = this.enemies[ene].x;
                        oldY = this.enemies[ene].y;
                        this.shipLives--;
                        this.enemies[ene].Kill();
                        this.player.Hit();
                        
                        if (this.enemies[ene].typeID == 0)
                        {
                            this.spawnParticles(oldX, oldY);
                            pScore += 1000;
                            createjs.Sound.play("enemy_death");
                        }
                        else
                        {
                            this.spawnParticles(oldX,oldY);
                            pScore += 1500;
                            createjs.Sound.play("enemy_death");
                        }
                    }
                }
                
            }
        }
        
        private checkCollisionBulletEnemy() : void {
            for (var bul = 0; bul < this.bullets.length; bul++)
            {
                for (var ene = 0; ene < this.enemies.length; ene++)
                {
                    if (this.enemies[ene].typeID == 4)
                    {
                        var edgeX = this.bullets[bul].x - this.enemies[ene].x;
                        var edgeY = this.bullets[bul].y - this.enemies[ene].y;
                        var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                        
                        if (len < 8 + 50)
                        {
                            var oldX, oldY;
                            oldX = this.enemies[ene].x;
                            oldY = this.enemies[ene].y;
                            this.bullets[bul].KillBullet();
                            this.enemies[ene].Hit();
                            
                            if (!this.enemies[ene].getAlive())
                            {
                                pScore += 2500;
                                this.spawnParticles(oldX, oldY);
                                createjs.Sound.play("enemy_death");
                            }
                        }
                    }
                    else
                    {
                        var edgeX = this.bullets[bul].x - this.enemies[ene].x + 25;
                        var edgeY = this.bullets[bul].y - this.enemies[ene].y + 25;
                        var len = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
                        
                        if (len < 8 + 25)
                        {
                            var oldX, oldY;
                            oldX = this.enemies[ene].x;
                            oldY = this.enemies[ene].y;
                            this.bullets[bul].KillBullet();
                            this.enemies[ene].Hit();
                            if (!this.enemies[ene].getAlive())
                            {
                                this.spawnParticles(oldX, oldY);
                                if (this.enemies[ene].typeID == 0)
                                {
                                    pScore += 1000;
                                    createjs.Sound.play("enemy_death");
                                }
                                else
                                {
                                    if (this.enemies[ene].typeID == 2)
                                    {
                                        for (var spl = 0; spl < 2; spl++)
                                        {
                                            var n: number = this.splitStart + spl;
                                            this.enemies[n] = new gameobject.Enemy(enemySplitSheet, "split1", 5);
                                            this.enemies[n].gotoAndPlay("animation");
                                            this.enemies[n].x = oldX;
                                            this.enemies[n].y = oldY;
                                            this.enemies[n].xDir = Math.random() * 2 - 1;
                                            this.enemies[n].yDir = Math.random() * 2 - 1;
                                            console.log("Spawning smaller guy: " + this.enemies[n].x + ", " + this.enemies[n].y);
                                            this.enemies[n].lives = 2;
                                            this.addChild(this.enemies[n]);
                                        }
                                        this.splitStart += 2;
                                    }
                                    
                                    this.player.addScore(1500);
                                    pScore += 1500;
                                    createjs.Sound.play("enemy_death");
                                }
                            }
                        }
                    }
                    
                }
            }
        }
    }
} 