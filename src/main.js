//Nikolas Sanchez *dab*
//STARTING TIER
//- Added my own copyright free bgm (10)
//- Create a new scrolling tile sprite for hte background(10)
//- Allow the player to control the Rocket after it's fired (10)
//NOVICE TIER
//- Create a new title screen (15)
//- Implement parallax scrolling (15)
//INTERMEDIATE TIER
//- Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25) 
//S-RANK TIER
//- Implement a simultaneous two-player mode (50)
//- Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)
//#FACADE TIER
//- I created a co-op play system where both players must balance the amount of orders they have
// in order to actually gain points, the game is co-op now pretty much. (idk like 20-40?)
//- Added gibby button, assets are not mine but I'd just like to share that it's there
// Press G for gibby (0)


let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 800,
    scene: [ Menu, Play],
}

let game = new Phaser.Game(config);
// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000    
}

//Reserves keyboard vars
let keyUP, keyLEFT, keyRIGHT, keyA, keyD, keyW, music, gibbyButton, gibbyFire; 