module gameobject {
	export class Coin extends createjs.Sprite {
		
		private scoreVal:number;
		
		private moveSpeed: number = 5;
		
		public alive: boolean = true;
		public fired: boolean = false;
		public aliveTimer: number = 400;
		public timer: number = 0;
		
		public xDir:number;
		public yDir:number;
		
		constructor()
		{
			super(coinSheet, "gold");
			this.regX = 20;
			this.regY = 20;
			
			this.x = -100;
			this.y = -100;
			
			this.xDir = 0;
			this.yDir = 0.1;
			
			this.alive = true;
		}
		
		public update()
		{
			if (this.alive == true && this.fired == true)
			{
				this.x += this.xDir * this.moveSpeed;
				this.y += this.yDir * this.moveSpeed;
				this.rotation += 0.5;
			}
			else if (this.alive == false)
			{
				
			}
		}
	}
}