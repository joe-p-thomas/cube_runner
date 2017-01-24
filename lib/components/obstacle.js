class Obstacle {
  constructor(windowWidth, windowHeight) {
    this.width = 1;
    this.height = 2;

    this.color = 255;

    // position is measured as the center of the obstacle
    this.x = windowWidth * Math.random();
    this.y = windowHeight / 2;

    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
  }

  move(shift) {
    this.x += (.0002 * (this.x - (this.windowWidth / 2)) * this.width);
    this.x += shift * this.width * .1;
    this.y += (.00004 * this.y * this.height);
  }

  resize() {
    this.width *= 1.015;
    this.height *= 1.015;
  }

  render(ctx, shift) {
    this.color -= 1;
    if (this.color < 5) {
      this.color = 0;
    }
    ctx.fillStyle = `rgb(${this.color},${this.color},${this.color})`;
    ctx.fillRect(this.x - (this.width / 2),
                 this.y - (this.height / 2),
                 this.width,
                 this.height);
    this.move(shift);
    this.resize();
  }
}

module.exports = Obstacle;
