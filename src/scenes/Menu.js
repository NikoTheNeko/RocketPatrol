class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //Loads audio
        this.load.image('menuBG', './assets/baconPatrolMenu.png');
        this.load.audio('bell', './assets/bell.wav');
        this.load.audio('cashregister', './assets/cashregister.mp3');
        this.load.audio('ska', './assets/blueSka.mp3');
    }

    create(){

        music = this.sound.add('ska');
        if(!music.isPlaying)
            music.play();
        console.log(this);
        //this.add.text(20,20, "AAAAAAAAAAAA MENU");
    
        //launches the next scene
        //this.scene.start("playScene");
        //pls play?? NO START!! ONLY PLAY
        this.bg1 = this.add.tileSprite(0, 0, 640, 900, 'menuBG').setOrigin(0,0);

        /** 
        //Displays the score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //Shows the menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use ← → arrows to move & (F) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);
        **/

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        music.setLoop(true);
        //Easy
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 60000,
            }
            this.sound.play('cashregister');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 5,
                gameTimer: 450000,
            }
            this.sound.play('cashregister');
            this.scene.start("playScene");
        }
    }
    
}