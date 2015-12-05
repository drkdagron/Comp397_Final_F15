module gameobject {
	export class ControlPoint extends createjs.Sprite {
		
		private alive:boolean = false;
		private lives: number = 0;
		
		constructor(sheet:createjs.SpriteSheet, frame:string)
		{
			super(sheet, frame);
			
			this.regX = 45.5;
			this.regY = 45.5;
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
		
		public update() { 
			this.rotation += 5;
		}
	}
}