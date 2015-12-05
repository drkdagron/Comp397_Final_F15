/// <reference path="../config/config.ts" />

/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/stats/stats.d.ts" />
/// <reference path="../typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../typings/easeljs/easeljs.d.ts" />
/// <reference path="../typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../typings/soundjs/soundjs.d.ts" />
/// <reference path="../typings/preloadjs/preloadjs.d.ts" />

/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/scene.ts" />

/// <reference path="../states/over.ts" />
/// <reference path="../states/game.ts" />
/// <reference path="../states/menu.ts" />

/// <reference path="../gameobjects/UiButton.ts" />
/// <reference path="../gameobjects/bullet.ts" />
/// <reference path="../gameobjects/enemy.ts" />
/// <reference path="../gameobjects/world.ts" />
/// <reference path="../gameobjects/player.ts" />
/// <reference path="../gameobjects/controlpoint.ts" />

// GLOBAL GAME FRAMEWORK VARIABLES
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;
var stats: Stats;
var state: number;
var currentState: objects.Scene; // alias for our current state

// GAME OBJECTS
var menu: states.Menu;
var game: states.Game;
var over: states.Over;

var score:number;

var background:createjs.Sound;

// manifest of all our assets
var manifest = [
    { id: "click", src: "../../Assets/audio/click1.ogg" },
    { id: "bg", src: "../../Assets/audio/pkmn_route1.mp3" },
    { id: "hit", src: "../../Assets/audio/thunder.ogg" },
    { id: "pickup", src: "../../Assets/audio/pickup4.ogg"},
];

var playerSheet: createjs.SpriteSheet;
var playerData = {

"images": [
    "../../Assets/images/player/atlas.png"
],

"frames": [
    [0, 0, 50, 38, 0, 0, 0],
],

"animations": {
    "ship": [0]
},
};


var enemySheet: createjs.SpriteSheet;
var enemyData = {

"images": [
    "../../Assets/images/enemies/atlas.png"
],

"frames": [
    [0, 0, 100, 100, 0, 0, 0],
    [100, 0, 100, 100, 0, 0, 0],
    [200, 0, 100, 100, 0, 0, 0],
    [300, 0, 100, 100, 0, 0, 0],
    [400, 0, 100, 100, 0, 0, 0]
],

"animations": {
    "split": [0],
    "normal": [1],
    "hardened": [2],
    "fast": [3],
    "boss": [4]
},
};

var worldSheet: createjs.SpriteSheet;
var worldData = {

"images": [
    "../../Assets/images/world/atlas.png"
],

"frames": [
    [0, 0, 800, 600, 0, 0, 0],
],

"animations": {
    "background": [0],
},
};

var bulletSheet: createjs.SpriteSheet;
var bulletData = {
  
  "images": [
    "../../Assets/images/bullets/atlas.png"  
  ],
    
  "frames": [
    [0,0,16,16,0,0,0],
  ],
  
  "animations": {
    "norton": [0],
  },
};

var controlPointSheet: createjs.SpriteSheet;
var controlPointData = {
  
  "images": [
    "../../Assets/images/controlpoint/atlas.png"  
  ],
    
  "frames": [
    [0,0,91,91,0,0,0]
  ],
  
  "animations": {
    "controlPoint": [0]
  },
};

var uiSheet: createjs.SpriteSheet;
var uiData = {
  
  "images": [
    "../../Assets/images/ui/atlas.png"  
  ],
    
  "frames": [
    [0,0,190,49,0,0,0], 
    [0,49,190,49,0,0,0],
    [0,98,190,49,0,0,0],
  ],
  
  "animations": {
    "play": [0],
    "restart": [1],
    "menu": [2],
  },
};



function preload(): void{
    
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    
    playerSheet = new createjs.SpriteSheet(playerData);
    enemySheet = new createjs.SpriteSheet(enemyData);
    worldSheet = new createjs.SpriteSheet(worldData);
    bulletSheet = new createjs.SpriteSheet(bulletData);
    uiSheet = new createjs.SpriteSheet(uiData);
    controlPointSheet = new createjs.SpriteSheet(controlPointData);
}


function init():void {
    
    canvas = document.getElementById("canvas"); // reference to canvas element
    stage = new createjs.Stage(canvas); // passing canvas to stage
    stage.enableMouseOver(20); // enable mouse events
    createjs.Ticker.setFPS(60); // set frame rate to 60 fps
    createjs.Ticker.on("tick", gameLoop); // update gameLoop every frame
    setupStats(); // sets up our stats counting

    state = config.MENU_STATE;
    changeState(state);

    //createjs.Sound.play("bg", null, 0, 0, -1, 0.05, 0);
}

// Main Game Loop
function gameLoop(event: createjs.Event): void {
    stats.begin(); // start counting

    currentState.update(); // calling State's update method
    stage.update(); // redraw/refresh stage every frame

    stats.end(); // stop counting
}

// Setup Game Stats
function setupStats():void {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}

// state machine prep
function changeState(state): void {
    // Launch various scenes

    switch (state) {
        case config.MENU_STATE:
            // show the menu scene
            stage.removeAllChildren();
            menu = new states.Menu();
            currentState = menu;
            break;
        case config.PLAY_STATE:
            // show the play scene
            stage.removeAllChildren();
            game = new states.Game();
            currentState = game;
            break;
        case config.OVER_STATE:
            // show the game over scene
            stage.removeAllChildren();
            over = new states.Over();
            currentState = over;
            break;
    }

    currentState.start();
    console.log(currentState.numChildren);
}
 