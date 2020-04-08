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
    }

    create(){
        //places a tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'gibby').setOrigin(0,0);
    
        //Creates a white rectangle border
        this.add.rectangle(5,5, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5,443, 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5,5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(603,5, 32, 455, 0xFFFFFF).setOrigin(0,0);
        //Creates a green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0,0);
    }

    update(){
        //scrolls the starfield
    //    this.starfield.tilePositionX += 4;
        this.starfield.tilePositionY -= 4;
    }
}