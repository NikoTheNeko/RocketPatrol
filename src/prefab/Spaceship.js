//Spaceship Prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    
    //Constructor
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);

        //Adds object to the scene 
        scene.add.existing(this); //add to existing, displayList, updateList
        this.points = pointValue;
    }

    update(){
        //Moves spaceship left
        this.x -= game.settings.spaceshipSpeed;
        //Wrap around screen bounds
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }

}