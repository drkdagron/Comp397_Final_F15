module states {
    // MENU CLASS
    export class Menu extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES

        private title: objects.Label;
        private howTo: objects.Label;

        private background: gameobject.World;
        
        private play: gameobject.UiButton;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            console.log("menu state started");
            
            this.background = new gameobject.World(worldSheet, "background");
            this.addChild(this.background);
            
            this.title = new objects.Label("1337 Bug Zapperz", "36px Consolas", "#FFFFFF", 400, 50);
            this.addChild(this.title);
            
            this.howTo = new objects.Label("Destroy all the bugs before\n\nthey destroy your control point!", "24px Consolas" ,"#FFFFFF", 400, 120);
            this.addChild(this.howTo);
            
            this.play = new gameobject.UiButton(uiSheet, "play", 400, 400);
            this.play.on("click", this.startGame, this);
            this.addChild(this.play);
            
            stage.addChild(this);
        }

        private startGame() : void 
        {
            changeState(config.PLAY_STATE);
        }

        public update(): void {
        }
    }

}