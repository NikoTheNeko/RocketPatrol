class Play extends Phaser.Scene {
    //Constructor
    constructor(){
        super("playScene");
    }

    //Function that loads the sprites when the scene is loaded
    preload(){
        //Loads image and tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('gibby', './assets/gibbah.png')
        this.load.image('joe', './assets/joe.png')

        //Loads animations
        this.load.spritesheet('explosion', './assets/explosion.png', 
        {frameWidth: 64, frameHeight:32, startFrame: 0, endFrame: 9});

        //Loads audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    //Function thats called when the scene is loaded
    create(){        
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Spaceships
        /////////////////////////////////////////////////////////////////////////////////////////////
        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + 192, 132,
             'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196,
            'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260,
            'spaceship', 0, 10).setOrigin(0,0);
       
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Player Movement
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Definds the keyboard keys
        //P1 controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //P2 Controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //Creates player 1 rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, `rocket`, keyLEFT, keyRIGHT, keyUP)
        .setScale(0.5, 0.5).setOrigin(0.0);
        this.p2Rocket = new Rocket(this, game.config.width/2, 431, `rocket`, keyA, keyD, keyW)
        .setScale(0.5, 0.5).setOrigin(0.0);

        /////////////////////////////////////////////////////////////////////////////////////////////
        //SCORE
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Holds the score
        this.p1Score = 0;

        //Displays the score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        /////////////////////////////////////////////////////////////////////////////////////////////
        //Animation
        /////////////////////////////////////////////////////////////////////////////////////////////

        //Creates the explode animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',
            {start:0, end:9, first: 0}),
            frameRate: 30
        });

        /////////////////////////////////////////////////////////////////////////////////////////////
        //Game Over Stuff
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Game over flag
        this.gameOver = false;


        /////////////////////////////////////////////////////////////////////////////////////////////
        //Timers
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Creates a clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    //Function that runs every frame
    update(){
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Game Over Stuff
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Checks input for resetart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)){
            this.scene.restart(this.p1Score);
        }
        //Checks input for menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if(!this.gameOver){
            //Update Rocket
            this.p1Rocket.update();
            this.p2Rocket.update();

            //Updates spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        /////////////////////////////////////////////////////////////////////////////////////////////
        //Collisions
        /////////////////////////////////////////////////////////////////////////////////////////////
        //P1 Ship Collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            console.log("Kaboom! Ship 3!");
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            console.log("Kaboom! Ship 2!");
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            console.log("Kaboom! Ship 1!");
        }

        //P2 Ship Collisions
        if(this.checkCollision(this.p2Rocket, this.ship03)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
            console.log("Kaboom! Ship 3!");
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
            console.log("Kaboom! Ship 2!");
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
            console.log("Kaboom! Ship 1!");
        }

    }

    //Checks the collision between a ship and a rocket
    //Rocket - The rocket being checked
    //The ship being checked
    checkCollision(rocket, ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
            } else {
                return false;
            }
    }

    //Ship Explode
    shipExplode(ship){
        //plays a sound
        this.sound.play('sfx_explosion');
        //Hides the ship
        ship.alpha = 0
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //Increments score
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }

}