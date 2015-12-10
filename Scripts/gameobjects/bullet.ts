module gameobject {
	export class Bullet extends createjs.Sprite {
		
		private scoreVal:number;
		
		private moveSpeed: number = 10;
		
		public alive: boolean = false;
		public fired: boolean = false;
		public aliveTimer: number = 60;
		public timer: number = 0;
		
		public xDir:number;
		public yDir:number;
		
		constructor()
		{
			super(bulletSheet, "norton");
			this.regX = 8;
			this.regY = 8;
			
			this.x = -100;
			this.y = -100;
			
			this.xDir = 0;
			this.yDir = 0.1;
			
			this.alive = false;
		}
		
		public direction(x:number, y:number): void {
			
			this.xDir = x;
			this.yDir = y;
		}
		
		public update()
		{
			this.timer++;
			if (this.timer > this.aliveTimer && this.alive)
			{
				this.alive = false;
				this.fired = false;
				this.x = -100;
				this.y = -100;
			}
			if (this.alive == true && this.fired == true)
			{
				this.x += this.xDir * this.moveSpeed;
				this.y += this.yDir * this.moveSpeed;
				
			}
			this.rotation += 60;
		}
	}
}