module states {
    // OVER CLASS
    export class Over extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES

        private background:gameobject.World;

        private gameover: objects.Label;
        private score: objects.Label;
        
        private againButton: gameobject.UiButton;
        private backButton: gameobject.UiButton;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            createjs.Sound.stop();
            console.log("over state started");
            
            this.background = new gameobject.World(worldSheet, "world");
            this.addChild(this.background);
            
            this.gameover = new objects.Label("GAME OVER!!!", "40px Consolas", "#222", 320, 125);
            this.addChild(this.gameover);
            
            this.score = new objects.Label("Your Score: " + score.toString(), "24px Consolas", "#222", 320, 180);
            this.addChild(this.score);
            
            this.againButton = new gameobject.UiButton(uiSheet, "restart", 320, 300);
            this.againButton.on("click", this.playAgain, this);
            this.addChild(this.againButton);
            
            this.backButton = new gameobject.UiButton(uiSheet, "menu", 320, 380);
            this.backButton.on("click", this.backMenu, this);
            this.addChild(this.backButton);
            
            stage.addChild(this);
            
        }

        private playAgain(): void {
            changeState(config.PLAY_STATE);
        }
        
        private backMenu(): void {
            changeState(config.MENU_STATE);
        }

        public update(): void {
           this.background.update();
        }
    }


}  