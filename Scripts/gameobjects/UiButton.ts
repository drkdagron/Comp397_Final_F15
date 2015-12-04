module gameobject
{
	export class UiButton extends createjs.Sprite
	{
		constructor(sheet:createjs.SpriteSheet, tile:string, x:number, y:number) {
            super(sheet, tile);
            this.x = x;
            this.y = y;  

            this.regX = 190 * 0.5;
            this.regY = 49 * 0.5;

            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }

        // PRIVATE METHODS
        // Event Handler for mouse over
        overButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 0.7;
        }

        // Event Handler for mouse out
        outButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1.0;
        }
	}
}