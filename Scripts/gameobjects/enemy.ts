module gameobject{
	export class Enemy extends createjs.Sprite{
		
		public xDir:number = 0;
		public yDir:number = 0;
		
		private moveSpeed:number = 4;
		private yBuffer:number = 20;
		
		private alive:boolean = false;
		public lives: number = 0;
		
		private diveBombTimer:number = 1500;
		private diveTimer: number = 0;
		public diving: boolean = false;
		
		private type:string = "normal";
		public typeID:number = 0; //0 - normal, 1 - fast, 2 - heavy, 3 - split, 4 - boss
		
		constructor(sheet:createjs.SpriteSheet, frame:string, type:number)
		{
			super(sheet, frame);
			
			this.regX = 50;
			this.regY = 50;
			
			this.lives = 3;
			this.typeID = type;
			
			this.alive = true;
			switch (this.typeID)
			{
				case 1:
				//fast moving enemy
					this.moveSpeed = 8;
					this.lives = 1;
					break;
				case 2:
					//split
					this.moveSpeed = 6;
					this.lives = 2;
					break;
				case 3:
				//hardened/heavy enemy
					this.moveSpeed = 2;
					this.lives = 5;
					break;
				case 4:
					//boss
					this.lives = 10;
					break;
				case 5:
					//split piece
					this.lives = 1;
					this.moveSpeed = 6;	
					break;
			}
		}
		
		private move(x:number, y:number): void {
			this.x += x * this.moveSpeed;
			this.y += y * this.moveSpeed;
		}
		
		public getAlive():boolean
		{
			return this.alive;
		}
		
		public Hit(): void
		{
			if (this.lives > 0)
			{
				this.lives--;
			}
			
			if (this.lives == 0)
			{
				this.alive = false;
				this.x = -100;
				this.y = 100;
			}
		}
		
		public Kill(): void {
			this.lives = 0;
			this.alive = false;
			this.x = -100;
			this.y = 100;
		}
		
		public update()
		{
			if (this.typeID == 5)
				console.log("Testing Life: " + this.lives);
			
			if (this.alive)
			{
				this.diveTimer++;
				if (this.diveTimer > this.diveBombTimer)
					this.diving = true;
				else
					this.diving = false;
					
				this.move(this.xDir, this.yDir);
				
				if (this.x < 0 - 40)
				{
					this.x = 840;
				}
				if (this.x > 840)
				{
					this.x = 0 - 40;
				}
				
				if (this.y > 640)
				{
					this.y = 0 - 40;
				}
				if (this.y < 0 - 40)
				{
					this.y = 640;
				}
			}
		}
	}
}