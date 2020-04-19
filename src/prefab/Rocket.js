//Class Prefab
class Rocket extends Phaser.GameObjects.Sprite{

    //Constructor
    constructor(scene, x, y, texture, left, right, shoot, frame){
        super(scene, x, y, texture, frame);

        //Adds object to the scene 
        scene.add.existing(this); //add to existing, displayList, updateList
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket');

        //Controls the movement variables
        this.moveLeft = left;
        this.moveRight = right;
        this.playerShoot = shoot;

        //Holds the original placement
        this.ogY = y;
    }

    update(){
        //Left/Right movement
        if(!this.isFiring){
            if(this.moveLeft.isDown && this.x >= 0){
                this.x -= 3;
            } else if(this.moveRight.isDown && this.x <= 620){
                this.x += 3;
            }
        }

        //Stunted movement when fired
        if(this.isFiring){
            if(this.moveLeft.isDown && this.x >= 0){
                this.x -= 1;
            } else if(this.moveRight.isDown && this.x <= 620){
                this.x += 1;
            }
        }

        //Fire button
        if(Phaser.Input.Keyboard.JustDown(this.playerShoot)){
            this.isFiring = true;
            this.sfxRocket.play();
        }

        //If fired, move up
        if(this.isFiring && this.y >= this.ogY - 300){
            this.y -= 2;
        }

        //Resets on miss
        if(this.y <= this.ogY - 300){
            this.reset();
        }
    }

    reset(){
        this.isFiring = false;
        this.y = this.ogY;
    }
}