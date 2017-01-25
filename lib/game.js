const Obstacle = require('./components/obstacle');
const Player = require('./components/player');
const key = window.key;

class Game {
  constructor(canvas, cb) {
    this.windowWidth = canvas.width;
    this.windowHeight = canvas.height;
    this.ctx = canvas.getContext("2d");

    this.gameOverCB = cb;

    this.player = new Player(this.windowWidth, this.windowHeight);
    this.obstacles = [];
    this.step = 0;
    this.gamePaused = false;

    key('space', () => {
      this.togglePause.bind(this)();
    });
  }

  start() {
    this.render();
  }

  gameOver() {
    this.gameOverCB(Math.round(this.step/10));
  }

  togglePause(){
    if (this.gamePaused) {
      this.gamePaused = false;
      this.render(this.step);
    } else {
      this.gamePaused = true;
    }
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
    let collision = false;

    this.obstacles.forEach((obstacle) => {
      let obstacleBottomY = obstacle.y + obstacle.height / 2;
      let obstacleLeftX = obstacle.x - obstacle.width / 2;
      let obstacleRightX = obstacle.x + obstacle.width / 2;

      if (this.player.startY < obstacleBottomY &&
          this.player.bottomY > obstacleBottomY &&
          this.player.startX > obstacleLeftX &&
          this.player.startX < obstacleRightX) {
        collision = true;
      }
    });
    return collision;
  }

  render(step = 0) {
    if (this.gamePaused) {
      this.renderPause();
    } else {
      step += 1;

      let shift = 0;
      if(key.isPressed('left')) {
        shift = 1;
      } else if (key.isPressed('right')) {
        shift = -1;
      }

      this.addObstacle(step);
      this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
      this.player.render(this.ctx, shift);
      this.renderScore(step);
      this.obstacles.forEach((obstacle) => obstacle.render(this.ctx, shift));

      if (this.checkCollissions()) {
        this.gameOver();
      } else {
        setTimeout(() => this.render(step), 1000/60);
      }
    }
  }

  renderScore(step) {
    this.step = step;
    this.ctx.font= '35px VT323';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(Math.round(step/10), 10, 25);
  }

  renderPause() {
    this.ctx.fillStyle = "#EEE";
    this.ctx.fillRect((this.windowWidth / 2) - 45,
                      (this.windowHeight / 2) - 45,
                      90,
                      90);

    this.ctx.fillStyle = '#444';
    this.ctx.fillRect((this.windowWidth / 2) - 15,
                      (this.windowHeight / 2) - 15,
                      10,
                      30);

    this.ctx.fillRect((this.windowWidth / 2) + 5,
                      (this.windowHeight / 2) - 15,
                      10,
                      30);
  }
}

module.exports = Game;
