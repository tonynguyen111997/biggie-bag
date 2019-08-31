//Parent object for sprites
class Populate {
  constructor () {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.sprite = "";
    this.sideways = 101;
    this.upDown = 83;
    this.scrollPosition = 500;
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    window.scrollTo(0, this.scrollPosition);
  }

  reset () {
    this.x = 505;
    this.y = 883;
    window.scrollTo(0, this.scrollPosition);
  }
}

//Player class
class Player extends Populate {
  constructor () {
    super();
    this.x = 505;
    this.y = 883;
    this.sprite = "images/char-boy.png";
    this.scrollPosition = 500;
  }

//key input for Player
  handleInput (input) {
    switch (input) {
      case "left":
        if (this.x >= this.sideways) {
          this.x -= this.sideways;
        }
        break;
      case "right":
        if (this.x <= this.sideways * 3) {
          this.x += this.sideways;
        }
        break;
      case "up":
        if (this.y >= 0) {
          this.y -= this.upDown;
          this.scrollPosition -= 50;
          window.scrollTo(0 , this.scrollPosition);
        }
        break;
      case "down":
        if (this.y <= this.upDown * 10) {
          this.y += this.upDown;
          this.scrollPosition += 50;
          window.scrollTo(0 , this.scrollPosition);
        }
        break;
    }
  }

  //updates player and sets condition for collision & win
  update () {
    for (let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.sideways / 2 > this.x && enemy.x < this.x + this.sideways / 2)) {
        this.scrollPosition = 500;
        this.reset();
      }
    }
  }
}

const player = new Player();

//Array to hold Enemy objects
const allEnemies = [];

//Enemy class
class Enemy extends Populate {
  constructor (x, y, speed) {
    super();
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
    this.enemySprite = this.sprite;
    this.sideways = 303;
  }

  //Smooth movement of Enemy objects across gameboard
  update (dt) {
    if (this.x < this.sideways * 5) {
      this.x += this.speed * dt;
    } else {
      this.x = -100;
    }
  }
}

// (starting position, y position, speed)
const enemy1 = new Enemy(201, 53, 550);
const enemy2 = new Enemy(404, 136, 350);
const enemy3 = new Enemy(0, 219, 675);

const enemy4 = new Enemy(0, 468, 500);
const enemy5 = new Enemy(50, 551, 400);
const enemy6 = new Enemy(320, 634, 300);
const enemy7 = new Enemy(110, 717, 200);
const enemy8 = new Enemy(220, 800, 350);

allEnemies.push(
  enemy1, enemy2, enemy3, 
  enemy4, enemy5, enemy6, enemy7, enemy8);

// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
