//Global variables
const VERTICAL_MOVE = 83;
const HORIZONTAL_MOVE = 101;
const LEFT_BOUND = 0;
const RIGHT_BOUND = 406;
const UPPER_BOUND = 0;
const LOWER_BOUND = 456;
const STARTING_POSITION = [202, 415];
const COLLISION_BUFFER = HORIZONTAL_MOVE / 2;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Updates the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < RIGHT_BOUND + HORIZONTAL_MOVE){
        this.x += this.speed * dt;
    } else {
        this.x = -HORIZONTAL_MOVE;
    }

    //checks for collision.
    //If collision occurs, players position is reset to starting position.
    if (this.y === player.y){
        if (player.x + COLLISION_BUFFER > this.x && player.x < this.x + COLLISION_BUFFER){
            player.reset();
        }
    }
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This is the hero of the game.
class Player {
    constructor(){
        this.x = STARTING_POSITION[0];
        this.y = STARTING_POSITION[1];
        this.sprite = 'images/char-boy.png';
        this.success = false;
        }

    //draws the player to the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //function that returns the player to the starting position
    reset(){
        this.x = STARTING_POSITION[0];
        this.y = STARTING_POSITION[1];
    }

    //this function determines where the player must move based on the keyboard input
    handleInput(input){
        if (input === 'left'){
            if (this.x - HORIZONTAL_MOVE >= LEFT_BOUND){
                this.x -= HORIZONTAL_MOVE;
            }
        } else if (input === 'up'){
            if (this.y - VERTICAL_MOVE >= UPPER_BOUND){
                this.y -= VERTICAL_MOVE;
            }
        } else if (input === 'right'){
            if (this.x + HORIZONTAL_MOVE <= RIGHT_BOUND){
                this.x += HORIZONTAL_MOVE;
            }
        } else {
            if (this.y + VERTICAL_MOVE <= LOWER_BOUND){
                this.y += VERTICAL_MOVE;
            }
        }
    }

    //this function updates the players position on the canvas
    //checks for win. If player makes it to the water, the game is won. Modal appears and game is reset.
    update(){
        if (this.y === 0){
            this.success = true;
            console.log(this.success);
        }
    }
}

//Player and Enemies are instantiated.
//Enemies are pushed to the allEnemies array.
const allEnemies = [];
const player = new Player();
const roach1 = new Enemy(-101, 83, 105);
const roach2 = new Enemy(-252, 83, 180);
const roach3 = new Enemy(-101, 166, 200);
const roach4 = new Enemy(-400, 249, 175);
allEnemies.push(roach1, roach2, roach3, roach4);


// This listens for key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
