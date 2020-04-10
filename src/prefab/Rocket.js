//Class Prefab
class Rocket extends Phaser.GameObjects.Sprite{

    //Constructor
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //Adds object to the scene 
        scene.add.existing(this); //add to existing, displayList, updateList
        this.isFiring = false;
    }

    update(){
        //Left/Right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= 47){
                this.x -= 2;
            } else if(keyRIGHT.isDown && this.x <= 578){
                this.x += 2;
            }
        }

        //Fire button
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
        }

        //If fired, move up
        if(this.isFiring && this.y >= 108){
            this.y -= 2;
        }

        //Resets on miss
        if(this.y <= 108){
            this.isFiring = false;
            this.y = 431;
        }
    }
}