module gameobject{
	export class Rock extends createjs.Sprite{
		
		private moveSpeed:number = 5;
		private yBuffer:number = 20;
		
		constructor(sheet:createjs.SpriteSheet, tile:string, x:number)
		{
			super(sheet, tile);
			
			this.resetStart(x);
			this.regX = 40;
			this.regY = 40;
		}
		
		private resetStart(x:number)
		{
			this.x = x;
			this.y = Math.random() * 480 + 1;
		}
		
		public reset()
		{
			this.x = 750;
			this.y = Math.random() * 480 + 1;
			if (this.y < 0 + this.yBuffer)
			{
				this.y = 0 + this.yBuffer;
			}
			else if (this.y > 480 - this.yBuffer)
			{
				this.y = 480 - this.yBuffer;
			}
			
			this.rotation = Math.random() * 360 + 1;
		}
		
		public update()
		{
			this.x -= this.moveSpeed;
			
			if (this.x < -100)
			{
				this.reset();
			}
		}
	}
}