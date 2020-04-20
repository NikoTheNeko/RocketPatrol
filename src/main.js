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
let keyUP, keyLEFT, keyRIGHT, keyA, keyD, keyW, music; 