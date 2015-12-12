module states {
    // MENU CLASS
    export class Instruction extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES

        private title: objects.Label;
        private howTo: objects.Label;
        private howTo2: objects.Label;

        private background: gameobject.World;
        
        private back: gameobject.UiButton;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            console.log("menu state started");
            
            this.background = new gameobject.World(worldSheet, "background");
            this.addChild(this.background);
            
            this.title = new objects.Label("How to play:", "36px Consolas", "#FFFFFF", 400, 50);
            this.addChild(this.title);
            
            this.howTo = new objects.Label("A/D - Rotate ship\n\nW - Move Forward\n\nS - Move Backward\n\nSpace - Fire Weapon", "24px Consolas" ,"#FFFFFF", 400, 150);
            this.addChild(this.howTo);
            
            this.howTo2 = new objects.Label("Destroy the enemy bugs before they\n\ndestroy your control point!", "24px Consolas", "#FFFFFF", 400, 275);
            this.addChild(this.howTo2);
            
            this.back = new gameobject.UiButton(uiSheet, "back", 400, 500);
            this.back.on("click", this.startGame, this);
            this.addChild(this.back);
            
            stage.addChild(this);
        }

        private startGame() : void 
        {
            changeState(config.MENU_STATE);
        }

        public update(): void {
        }
    }

}