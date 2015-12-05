module gameobject{
	export class Enemy extends createjs.Sprite{
		
		public xDir:number = 0;
		public yDir:number = 0;
		
		private moveSpeed:number = 2;
		private yBuffer:number = 20;
		
		private alive:boolean = false;
		private lives: number = 0;
		
		private type:string = "normal";
		public typeID:number = 0; //0 - normal, 1 - fast, 2 - heavy, 3 - split, 4 - boss
		
		constructor(sheet:createjs.SpriteSheet, frame:string, type:number)
		{
			super(sheet, frame);
			
			this.regX = 50;
			this.regY = 50;
			
			this.lives = 3;
			this.typeID = type;
			switch (this.typeID)
			{
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
			}
		}
		
		private move(x:number, y:number): void {
			this.x += x * this.moveSpeed;
			this.y += y * this.moveSpeed;
		}
		
		public Hit(): void
		{
			if (this.lives > 0)
			{
				this.lives--;
			}
			else
			{
				this.alive = false;
				this.x = -100;
				this.y = 100;
			}
		}
		
		public update()
		{
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