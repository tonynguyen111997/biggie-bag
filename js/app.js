var firebaseConfig = {
  apiKey: 'AIzaSyDcJk9e3uqwwcv3xdb-IBpKI41bNP5N5dA',
  authDomain: 'froggergame-6270c.firebaseapp.com',
  databaseURL: 'https://froggergame-6270c.firebaseio.com',
  projectId: 'froggergame-6270c',
  storageBucket: '',
  messagingSenderId: '53643201774',
  appId: '1:53643201774:web:b1aed74ef074f699'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();

//Parent object for sprites

//DOM objects
const loserMenu = document.getElementById('loserMenuContainer');
const loserMenuBtn = document.getElementById('loserMenuButton');

class Populate {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.sprite = '';
		this.sideways = 101;
		this.upDown = 83;
		this.scrollPosition = 500;
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		window.scrollTo(0, this.scrollPosition);
	}

	reset() {
		this.x = 505;
		this.y = 883;
		loserMenu.style.display = 'none';
		loserMenuBtn.removeEventListener('click', () => {
			this.reset();
		});
		window.scrollTo(0, this.scrollPosition);
	}
}

//Player class
class Player extends Populate {
  constructor(name, x, model) {
    super();
    this.x = x;
    this.y = 883;
    this.sprite = model;
    this.name = name;
    this.scrollPosition = 500;
    firebase.database().ref('users/' + this.name).set({
      name: this.name,
      positionX: this.x,
      positionY: this.y,
    });
  }

  //key input for Player
  handleInput(input) {
    switch (input) {
      case 'left':
        if (this.x >= this.sideways) {
          firebase.database().ref('users/' + this.name).set({
            positionX: this.x,
            positionY: this.y,
          });
          this.x -= this.sideways;
        }
        break;
      case "right":
        if (this.x <= this.sideways * 10) {
          firebase.database().ref('users/' + this.name).set({
            positionX: this.x,
            positionY: this.y,
          });
          this.x += this.sideways;
        }
        break;
      case 'up':
        if (this.y >= 0) {
          this.y -= this.upDown;
          this.scrollPosition -= 50;
          window.scrollTo(0, this.scrollPosition);
          firebase.database().ref('users/' + this.name).set({
            positionX: this.x,
            positionY: this.y,
          });
        }
        break;
      case 'down':
        if (this.y <= this.upDown * 10) {
          this.y += this.upDown;
          this.scrollPosition += 50;
          window.scrollTo(0, this.scrollPosition);
          firebase.database().ref('users/' + this.name).set({
            positionX: this.x,
            positionY: this.y,
          });
        }
        break;
    }
  }

  //updates player and sets condition for collision & win
  update() {
    for (let enemy of allEnemies) {
      if (
        this.y === enemy.y &&
        (enemy.x + enemy.sideways / 2 > this.x &&
          enemy.x < this.x + this.sideways / 2)
      ) {
        this.scrollPosition = 500;
        loserMenu.style.display = "flex";
        loserMenuBtn.addEventListener("click", () => {
          this.reset();
        })
      }
    }
  }
}

const player1 = new Player("bob", 505, 'images/char-boy.png');
const player2 = new Player("joe", 101, 'images/char-boy.png');

//Array to hold Enemy objects
const allEnemies = [];

//Enemy class
class Enemy extends Populate {
	constructor(x, y, speed) {
		super();
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/enemy-bug.png';
		this.enemySprite = this.sprite;
		this.sideways = 303;
	}

	//Smooth movement of Enemy objects across gameboard
	update(dt) {
		if (this.x < this.sideways * 5) {
			this.x += this.speed * dt;
		} else {
			this.x = -100;
		}
	}
}

// (starting position, y position, speed)
// Enemies on first 3 rows
const enemy1 = new Enemy(201, 53, 550);
const enemy2 = new Enemy(404, 136, 350);
const enemy3 = new Enemy(0, 219, 675);
const enemyMore1 = new Enemy(51, 53, 550);
const enemyMore2 = new Enemy(204, 136, 350);
const enemyMore3 = new Enemy(100, 219, 675);
const enemyMoreMore1 = new Enemy(377, 53, 550);
const enemyMoreMore2 = new Enemy(477, 136, 350);
const enemyMoreMore3 = new Enemy(577, 219, 675);

// Enemies on last 5 rows
const enemy4 = new Enemy(0, 468, 500);
const enemy5 = new Enemy(50, 551, 400);
const enemy6 = new Enemy(320, 634, 300);
const enemy7 = new Enemy(110, 717, 200);
const enemy8 = new Enemy(220, 800, 350);
const enemyMore4 = new Enemy(500, 468, 300);
const enemyMore5 = new Enemy(400, 551, 600);
const enemyMore6 = new Enemy(120, 634, 1000);
const enemyMore7 = new Enemy(310, 717, 100);
const enemyMore8 = new Enemy(520, 800, 250);
const enemyMoreMore4 = new Enemy(300, 468, 100);
const enemyMoreMore5 = new Enemy(100, 551, 200);
const enemyMoreMore6 = new Enemy(420, 634, 100);
const enemyMoreMore7 = new Enemy(210, 717, 300);
const enemyMoreMore8 = new Enemy(120, 800, 550);

allEnemies.push(
	enemy1,
	enemy2,
	enemy3,
	enemyMore1,
	enemyMore2,
	enemyMore3,
	enemyMoreMore1,
	enemyMoreMore2,
	enemyMoreMore3,
	enemy4,
	enemy5,
	enemy6,
	enemy7,
	enemy8,
	enemyMore4,
	enemyMore5,
	enemyMore6,
	enemyMore7,
	enemyMore8
);

// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  var joeKeys = {
    65: 'left',
    87: 'up',
    68: 'right',
    83: 'down'
  }
  // console.log('x', player.x);
  console.log('y', player1.y);
  player1.handleInput(allowedKeys[e.keyCode]);
  player2.handleInput(joeKeys[e.keyCode]);

  if (player1.y == -30) {
    alert("You win")
    player.scrollPosition = 500;
    player.reset()
    score++;
    $("#score").text("Total score:" +score)
    
  }
});

let player1XPosition = player1.x;
let player1YPosition = player1.y;
let player2XPosition;
let player2YPosition; 


//Player score
let score = 0;




