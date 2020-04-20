class Play extends Phaser.Scene {
    //Constructor
    constructor(){
        super("playScene");
    }

    //Function that loads the sprites when the scene is loaded
    preload(){
        //Loads image and tile sprites
        //this.load.image('rocket', './assets/rocket.png');
        //this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('restBG1', './assets/RestaurantBackground1.png');
        this.load.image('restBG2', './assets/RestaurantBackground2.png');
        this.load.image('pp1', './assets/ppl1.png');
        this.load.image('pp2', './assets/ppl2.png');
        this.load.image('pp3', './assets/ppl3.png');
        this.load.image('rec1', './assets/reciept1.png');
        this.load.image('rec2', './assets/reciept2.png');
        this.load.image('rec3', './assets/reciept3.png');
        this.load.image('pan1', './assets/pan1.png');
        this.load.image('pan2', './assets/pan2.png');
        this.load.image('pan3', './assets/pan3.png');
        this.load.image('bacon', './assets/bacon.png');
        this.load.image('pen', './assets/pen.png');
        this.load.image('gibby', './assets/gibbah.png');
        this.load.image('joe', './assets/joe.png');

        //Loads animations
        this.load.spritesheet('moneyExplosion', './assets/moneyExplosion.png', 
        {frameWidth: 128, frameHeight:64, startFrame: 0, endFrame: 21});

        //Loads audio
        this.load.audio('cashregister', './assets/cashregister.mp3');
        this.load.audio('bell', './assets/bell.wav');
        this.load.audio('scribble', './assets/scribble.wav');
        this.load.audio('sizzle', './assets/sizzle.wav');
        this.load.audio('gibby', './assets/gibby.mp3')

    }

    //Function thats called when the scene is loaded
    create(){        
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Background
        /////////////////////////////////////////////////////////////////////////////////////////////
        this.bg1 = this.add.tileSprite(0, 0, 640, 900, 'restBG1').setOrigin(0,0);
        this.peopleFar = this.add.tileSprite(0, 120, 640, 100, 'pp3').setOrigin(0,0);
        this.peopleMed = this.add.tileSprite(0, 120, 640, 150, 'pp2').setOrigin(0,0);
        this.peopleClose = this.add.tileSprite(0, 100, 640, 200, 'pp1').setOrigin(0,0);
        this.bg2 = this.add.tileSprite(0, 0, 640, 900, 'restBG2').setOrigin(0,0);


        /////////////////////////////////////////////////////////////////////////////////////////////
        //Spaceships
        /////////////////////////////////////////////////////////////////////////////////////////////
        //add spaceships
        this.reciept3 = new Spaceship(this, game.config.width + 300, 20,
            'rec3', 0, 30).setOrigin(0,0);
        this.reciept2 = new Spaceship(this, game.config.width + 150, 80,
            'rec2', 0, 20).setOrigin(0,0);
        this.reciept1 = new Spaceship(this, game.config.width, 140, 
            'rec1', 0, 10).setOrigin(0,0);
        this.pans3 = new Spaceship(this, game.config.width + 300, 450,
            'pan3', 0, 30).setOrigin(0,0);
        this.pans2 = new Spaceship(this, game.config.width + 150, 510,
            'pan2', 0, 20).setOrigin(0,0);
        this.pans1 = new Spaceship(this, game.config.width, 570, 
            'pan1', 0, 10).setOrigin(0,0);
       
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Player Movement
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Definds the keyboard keys
        //P1 controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        gibbyButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

        //P2 Controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //Creates player rockets
        this.p1Rocket = new Rocket(this, game.config.width/2, 320, `pen`, keyLEFT, keyRIGHT, keyUP)
        .setScale(0.5, 0.5).setOrigin(0.0);
        this.p2Rocket = new Rocket(this, game.config.width/2, 750, `bacon`, keyA, keyD, keyW)
        .setScale(0.5, 0.5).setOrigin(0.0);

        //Creates gibby
        this.gibbay = this.add.sprite(320, -300, 'gibby');

        /////////////////////////////////////////////////////////////////////////////////////////////
        //SCORE
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Holds the score
        this.p1Score = 0;
        this.p2Score = 0;
        this.totalScore = 0;
        this.p1OrderCount = 0;
        this.p2OrderCount = 0;

        //Displays the score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            //backgroundColor: '#F3B141',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.p1text = this.add.text(100, 360, 'P1', scoreConfig);
        this.p2text = this.add.text(350, 360, 'P2', scoreConfig);
        this.totaltext = this.add.text(550, 360, 'Total', scoreConfig);
        this.moneytext = this.add.text(10, 410, 'Orders', scoreConfig);
        this.ordertext = this.add.text(10, 390, 'Money', scoreConfig);

        
        this.p1Orders = this.add.text(100, 410, this.p1OrderCount, scoreConfig);
        this.p1Money = this.add.text(100, 390, this.p1Score, scoreConfig);
        this.p2Orders = this.add.text(350, 410, this.p2OrderCount, scoreConfig);
        this.p2Money = this.add.text(350, 390, this.p2Score, scoreConfig);
        this.totalDisplay = this.add.text(550, 390, this.totalScore, scoreConfig);

        /////////////////////////////////////////////////////////////////////////////////////////////
        //Animation
        /////////////////////////////////////////////////////////////////////////////////////////////

        //Creates the explode animation
        this.anims.create({
            key: 'moneyExplode',
            frames: this.anims.generateFrameNumbers('moneyExplosion',
            {start:0, end:21, first: 0}),
            frameRate: 45
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
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'UP to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    //Function that runs every frame
    update(){
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Background Movement
        /////////////////////////////////////////////////////////////////////////////////////////////
        this.peopleFar.tilePositionX -= 1;
        this.peopleMed.tilePositionX += 2;
        this.peopleClose.tilePositionX -= 3;


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
            this.reciept1.update();
            this.reciept2.update();
            this.reciept3.update();
            this.pans1.update();
            this.pans2.update();
            this.pans3.update();
        }

        /////////////////////////////////////////////////////////////////////////////////////////////
        //Collisions
        /////////////////////////////////////////////////////////////////////////////////////////////
        //P1 Ship Collisions
        if(this.checkCollision(this.p1Rocket, this.reciept3)){
            this.p1Rocket.reset();
            this.shipExplode(this.reciept3, 1, 'scribble');
            console.log("Kaboom! Ship 3!");
        }
        if(this.checkCollision(this.p1Rocket, this.reciept2)){
            this.p1Rocket.reset();
            this.shipExplode(this.reciept2, 1, 'scribble');
            console.log("Kaboom! Ship 2!");
        }
        if(this.checkCollision(this.p1Rocket, this.reciept1)){
            this.p1Rocket.reset();
            this.shipExplode(this.reciept1, 1, 'scribble');
            console.log("Kaboom! Ship 1!");
        }

        //P2 Ship Collisions
        if(this.checkCollision(this.p2Rocket, this.pans3)){
            this.p2Rocket.reset();
            this.shipExplode(this.pans3, 2, 'sizzle');
            console.log("Kaboom! Ship 3!");
        }
        if(this.checkCollision(this.p2Rocket, this.pans2)){
            this.p2Rocket.reset();
            this.shipExplode(this.pans2, 2, 'sizzle');
            console.log("Kaboom! Ship 2!");
        }
        if(this.checkCollision(this.p2Rocket, this.pans1)){
            this.p2Rocket.reset();
            this.shipExplode(this.pans1, 2, 'sizzle');
            console.log("Kaboom! Ship 1!");
        }

        //Score stuff
        this.calcTotal();

        //Gibby
        if(Phaser.Input.Keyboard.JustDown(gibbyButton) && !gibbyFire){
            this.sound.play('gibby');
            gibbyFire = true;
        }

        if(gibbyFire)
            this.gibbay.y += 13;

        if(this.gibbay.y > 1000){
            gibbyFire = false;
            this.gibbay.y = -300;
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
    shipExplode(ship, playerNum, soundFX){
        //plays a sound
        this.sound.play(soundFX);
        //Hides the ship
        ship.alpha = 0
        let boom = this.add.sprite(ship.x, ship.y, 'moneyExplosion').setOrigin(0,0);
        boom.anims.play('moneyExplode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //Increments score
        if(playerNum == 1){
            this.p1Score += ship.points;
            this.p1OrderCount += 1;
            this.p1Money.text = this.p1Score;
            this.p1Orders.text = this.p1OrderCount;
        } else if (playerNum == 2){
            this.p2Score += ship.points;
            this.p2OrderCount += 1;
            this.p2Money.text = this.p2Score;
            this.p2Orders.text = this.p2OrderCount;
        }
    }

    //Calculate Total
    calcTotal(){
        if(this.p1OrderCount == this.p2OrderCount){
            this.totalScore = this.p1Score + this.p2Score;
        }
        if(this.p1OrderCount > this.p2OrderCount){
            this.totalScore = this.p2Score + this.p1Score;
            var difference = this.p1Score - this.p2Score;
            this.totalScore = this.totalScore - difference;
        } else if (this.p1OrderCount < this.p2OrderCount){
            this.totalScore = this.p1Score + this.p2Score;
            var difference = this.p2Score - this.p1Score;
            this.totalScore = this.totalScore - difference;
            }
        
        this.totalDisplay.text = this.totalScore;
    }

    

}