module gameobject {
	export class Particle extends createjs.Sprite {
		
		private moveSpeed: number = 10;
		
		public alive: boolean = false;
		public aliveTimer: number = 45;
		public timer: number = 0;
		
		public xDir:number;
		public yDir:number;
		
		constructor()
		{
			super(particleSheet, "part");
			this.regX = 4;
			this.regY = 4;
			
			this.x = -100;
			this.y = -100;
			
			this.xDir = 0;
			this.yDir = 0;
			
			this.alive = false;
		}
		
		public spawnDirection(x:number, y:number)
		{
			this.x = x;
			this.y = y;
			
			var angle:number = Math.random() * 360;
			
			var radian = angle * (Math.PI/180);
			
			console.log(this.rotation);
			var eX = Math.cos(radian + Math.PI/2);
			var eY = Math.sin(radian + Math.PI/2);
			console.log(eX + "\t" + eY);
		
			var len = Math.sqrt(eX * eX + eY * eY);
			eX /= len;
			eY /= len;
			
			this.xDir = eX;
			this.yDir = eY;	
			
			this.alive = true;
			
			console.log("spawning particle @ " + this.x + ", " + this.y + " moving in direction: " + eX + ", " + eY);
		}
		
		public direction(x:number, y:number): void {
			
			this.xDir = x;
			this.yDir = y;
		}
		
		public update()
		{
			if (this.alive == true)
			{
				this.timer++;
				if (this.timer > this.aliveTimer)
				{
					this.alive = false;
					this.x = -100;
					this.y = -100;
					this.timer = 0;
				}
				this.rotation += 60;
				
				this.x += this.xDir;
				this.y += this.yDir;
			}
		}
	}
}