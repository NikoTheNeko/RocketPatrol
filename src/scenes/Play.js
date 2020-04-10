class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //Loads image and tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('gibby', './assets/gibbah.png')
        this.load.image('joe', './assets/joe.png')
    }

    create(){
        //places a tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
    
        //Creates a white rectangle border
        this.add.rectangle(5,5, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5,443, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5,5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(603,5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        //Creates a green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0,0);
        
        //Creates a rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, `rocket`)
        .setScale(0.5, 0.5).setOrigin(0.0);

        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + 192, 132,
             'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196,
            'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260,
            'spaceship', 0, 10).setOrigin(0,0);
        //Definds the keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


    }

    update(){
        //scrolls the starfield
        this.starfield.tilePositionX -= 4;
    //    this.starfield.tilePositionY -= 4;

        //Update Rocket
        this.p1Rocket.update();

        //Updates spaceships
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
    }
}