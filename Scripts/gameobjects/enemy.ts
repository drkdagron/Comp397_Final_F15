module gameobject{
	export class Enemy extends createjs.Sprite{
		
		public xDir:number = 0;
		public yDir:number = 0;
		
		private moveSpeed:number = 5;
		private yBuffer:number = 20;
		
		private alive:boolean = false;
		private lives: number = 0;
		
		constructor(sheet:createjs.SpriteSheet, tile:string)
		{
			super(sheet, tile);
			
			this.regX = 40;
			this.regY = 40;
			
			this.x = -100;
			this.y = 100;
		}
		
		private move(x:number, y:number): void {
			this.x += x;
			this.y += y;
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