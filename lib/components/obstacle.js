class Obstacle {
  constructor(windowWidth, windowHeight) {
    this.width = 1;
    this.height = 2;

    this.color = 255;

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
    this.width *= 1.017;
    this.height *= 1.017;
  }

  render(ctx, shift) {
    this.move(shift);
    this.resize();
    this.color -= 1;
    if (this.color < 5) {
      this.color = 0;
    }
    ctx.fillStyle = `rgb(${this.color},${this.color},${this.color})`;
    ctx.fillRect(this.x - (this.width / 2),
                 this.y - (this.height / 2),
                 this.width,
                 this.height);
  }

}

module.exports = Obstacle;
