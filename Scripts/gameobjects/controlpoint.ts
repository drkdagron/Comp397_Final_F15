module gameobject {
	export class ControlPoint extends createjs.Sprite {
		
		private alive:boolean = false;
		private lives: number = 5;
		
		constructor(sheet:createjs.SpriteSheet, frame:string)
		{
			super(sheet, frame);
			
			this.regX = 50;
			this.regY = 50;
		}
		
		public Hit(): void
		{
			if (this.lives > 1)
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
		
		public Kill(): void {
			this.lives = 0;
			this.alive = false;
			this.x = -100;
			this.y = 100;
		}
		
	    public getLives():number
		{
			return this.lives;
		}
		
		public setLives(lives: number):void
		{
			this.lives = lives;
		}
		
		public update() { 
			this.rotation += 10;
		}
	}
}