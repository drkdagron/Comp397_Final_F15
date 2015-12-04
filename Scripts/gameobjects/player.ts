module gameobject
{
	export class Player extends createjs.Sprite{	
		private speed:number = 3;
		private defaultTurnRate:number = 3.5;
		private lives: number = 5;
		
		private score:number = 0;
		private coins:gameobject.Bullet[] = [];
		
		private firing: boolean = false;
		private fireTimer: number = 0;
		private fireRate: number = 30;
		
		constructor(sheet:createjs.SpriteSheet, frame:string)
		{
			super(sheet, frame);	
			this.setBounds(0,0,50, 38);
			this.regX = 50 /2;
			this.regY = 38 / 2;
			
			window.onkeydown = this.keyPressed;
			window.onkeyup = this.keyReleased;

		}
		
		private keyPressed(event:KeyboardEvent)
		{
			switch (event.keyCode)
			{
				
				case 32:
					config.FIRING = true;
					break;
				case 37:
				case 65:
					config.MOVE_LEFT = true;
					break;
				case 87:
				case 38:
					config.MOVE_UP = true;
					break;
				case 39:
				case 68:
					config.MOVE_RIGHT = true;
					break;
				case 40:
				case 83:
					config.MOVE_DOWN = true;
					break;
			}
		}
		
		private keyReleased(event:KeyboardEvent)
		{
			switch (event.keyCode)
			{
				case 32:
					config.FIRING = false;
					break;
				case 37:
				case 65:
					config.MOVE_LEFT= false;
					break;
				case 38:
				case 87:
					config.MOVE_UP = false;
					break;
				case 39 :
				case 68:
					config.MOVE_RIGHT= false;
					break;
				case 40:
				case 83:
					config.MOVE_DOWN = false;
					break;
			}
		}
		
		private faceMouse()
		{
			var x: number = stage.mouseX;
			var y: number = stage.mouseY;
			
			var edgeX = x - this.x;
			var edgeY = y - this.y;
			
			var rotateValue = (Math.atan2(edgeY, edgeX) * (180/Math.PI)) + 90;
			
			this.rotation = rotateValue;
		}
		
		private move(x:number, y:number)
		{
			this.x += x;
			this.y += y;
		}
		
		public addScore(add:number) : void
		{
			this.score += add;
		}
		
		public setScore(num:number) : void
		{
			this.score = num;
		}
		
		public getScore(): number
		{
			return this.score;
		}
		
		public playerHit(): void
		{
			this.lives--;
		}
		
		public getLives():number
		{
			return this.lives;
		}
		
		private Bang(coin:gameobject.Bullet[]):void {
			
			var x = stage.mouseX;
			var y = stage.mouseY;
			
			var edgeX = this.x - x;
			var edgeY = this.y - y;
			
			var norm = Math.sqrt(edgeX * edgeX + edgeY * edgeY);
			edgeX /= -norm;
			edgeY /= -norm;
			
			for (var i = 0; i < coin.length; i++)
			{
				if (coin[i].alive == false && coin[i].fired == false)
				{
					coin[i].timer = 0;
					coin[i].direction(edgeX, edgeY);
					coin[i].alive = true;
					coin[i].fired = true;
					coin[i].x = this.x;
					coin[i].y = this.y;
					this.fireTimer =0 ;
					return;
				}
				
			}
			
			console.log("BANG");
		}
		
		public update(coin:gameobject.Bullet[])
		{				
			this.faceMouse();
			
			this.fireTimer++;
			if (this.fireTimer > this.fireRate)
			{
				this.firing = true;
			}
			else
				this.firing = false;
			if (config.FIRING && this.firing)
			{
				this.Bang(coin);
			}
			
			if (config.MOVE_LEFT)
			{
				this.move(-this.speed, 0);
			}
			if (config.MOVE_RIGHT)
			{
				this.move(this.speed,0);
			}
			if (config.MOVE_UP)
			{
				this.move(0,-this.speed);
			}
			if (config.MOVE_DOWN)
			{
				this.move(0,this.speed);
			}
			
			if (this.x < 10)
			{
				this.x = 10;
			}
			if (this.y < 10)
			{
				this.y = 10;
			}
			if (this.y > 590)
			{
				this.y = 590;
			}
			if (this.x > 790)
			{
				this.x = 790;
			}
		}
		
		public setPosition(x:number, y:number)
		{
			this.x = x;
			this.y = y;
		}
	}
}