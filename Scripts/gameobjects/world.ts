module gameobject{
	export class World extends createjs.Sprite
	{
		private sizeX:number;
		private sizeY:number;
		
		private frameX: number;
		
		private moveSpeed:number = 5;
		
		constructor(sheet:createjs.SpriteSheet, tile:string)
		{
			super(sheet, tile);
			
			this.sizeX = 1920;
			this.sizeY = 480;
			
			this.frameX = 640;
			this.reset();
		}
		
		public reset()
		{
			this.x = 0;
			this.y = 0;
		}
		
		public update()
		{
			this.x -= this.moveSpeed;
			if (this.x < -(this.sizeX - this.frameX))
			{
				this.reset();
			}
		}
	}
}