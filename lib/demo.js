const Obstacle = require('./components/obstacle');

class Demo {
  constructor(canvas) {
    this.windowWidth = canvas.width;
    this.windowHeight = canvas.height;
    this.ctx = canvas.getContext("2d");

    this.obstacles = [];
    this.paused = false;
  }

  start() {
    this.paused = false;
    this.render();
  }

  pause() {
    this.paused = true;
    this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
  }

  addObstacle(step) {
    if (step % 4 === 0) {
      this.obstacles.unshift(new Obstacle(this.windowWidth,
                                          this.windowHeight));
      if (this.obstacles.length > 155) {
        this.obstacles = this.obstacles.slice(0,-1);
      }
    }
  }

  render(step = 0) {
    step += 1;
    this.addObstacle(step);
    this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
    this.obstacles.forEach((obstacle) => obstacle.render(this.ctx, 0));
    if (!this.paused) {
      setTimeout(() => this.render(step), 1000/60);
    }
  }

}

module.exports = Demo;
