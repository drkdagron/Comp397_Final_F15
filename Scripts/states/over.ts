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
            console.log("over state started");
            
            createjs.Sound.stop();
            createjs.Sound.play("game_over");
            musicPlaying = false;
            
            this.background = new gameobject.World(worldSheet, "world");
            this.addChild(this.background);
            
            this.gameover = new objects.Label("GAME OVER!!!", "40px Consolas", "#EEE", 400, 150);
            this.addChild(this.gameover);
            
            this.score = new objects.Label("Your Score: " + pScore.toString(), "24px Consolas", "#EEE", 400, 200);
            this.addChild(this.score);
            
            this.againButton = new gameobject.UiButton(uiSheet, "restart", 400, 325);
            this.againButton.on("click", this.playAgain, this);
            this.addChild(this.againButton);
            
            this.backButton = new gameobject.UiButton(uiSheet, "menu", 400, 400);
            this.backButton.on("click", this.backMenu, this);
            this.addChild(this.backButton);
            
            stage.addChild(this);
        }

        private playAgain(): void {
            pScore = 0;
            changeState(config.PLAY_STATE);            
        }
        
        private backMenu(): void {
            pScore = 0;
            changeState(config.MENU_STATE);
        }

        public update(): void {
        }
    }


}  