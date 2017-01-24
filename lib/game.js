const Obstacle = require('./components/obstacle');
const Player = require('./components/player');

class Game {
  constructor(canvas) {
    this.windowWidth = canvas.width;
    this.windowHeight = canvas.height;
    this.ctx = canvas.getContext("2d");

    this.player = new Player(this.windowWidth, this.windowHeight);
    this.obstacles = [];
  }

  start() {
    this.addObstacle();
    this.render(0);
  }

  addObstacle(step) {
    if (step % 3 === 0) {
      this.obstacles.unshift(new Obstacle(this.windowWidth,
                                          this.windowHeight));
      if (this.obstacles.length > 155) {
        this.obstacles = this.obstacles.slice(0,-1);
      }
    }
  }

  checkCollissions() {
    let collision;

    this.obstacles.forEach((obstacle) => {
      collision = false;
      let obstacleBottomY = obstacle.y + obstacle.height / 2;
      let obstacleLeftX = obstacle.x - obstacle.width / 2;
      let obstacleRightX = obstacle.x + obstacle.width / 2;

      if (this.player.startY < obstacleBottomY &&
          this.player.bottomY > obstacleBottomY &&
          this.player.startX > obstacleLeftX &&
          this.player.startX < obstacleRightX) {
        console.log("Collision!");
      }
    });
  }

  render(step) {
    step += 1;

    let shift = 0;
    if(key.isPressed('left')) {
      shift = 1;
    } else if (key.isPressed('right')) {
      shift = -1;
    }
    this.checkCollissions();


    this.addObstacle(step);
    this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
    this.player.render(this.ctx, shift);
    this.renderScore(step);
    this.obstacles.forEach((obstacle) => obstacle.render(this.ctx, shift));

    setTimeout(() => this.render(step), 1000/60);
  }

  renderScore(step) {
    this.ctx.font= '20px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(Math.round(step/10), 10, 20);
  }
}

module.exports = Game;
