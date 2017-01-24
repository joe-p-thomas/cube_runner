class Player {
   constructor(windowWidth, windowHeight) {
     this.windowWidth = windowWidth;
     this.windowHeight = windowHeight;

     this.startX = this.windowWidth / 2;
     this.startY = this.windowHeight * .85;

     this.leftX = this.startX - this.windowHeight * .03;
     this.rightX = this.startX + this.windowHeight * .03;
     this.bottomY = this.startY + this.windowHeight * .07;
   }

   render(ctx, shift) {
     ctx.fillStyle = 'lightgrey';
     ctx.beginPath();
     ctx.moveTo(this.startX, this.startY);
     ctx.lineTo(this.rightX, this.bottomY - 2*shift);
     ctx.lineTo(this.leftX, this.bottomY + 2*shift);
     ctx.fill();

     ctx.translate(0, -15);
     ctx.fillStyle = 'black';
     ctx.beginPath();
     ctx.moveTo(this.startX, this.startY);
     ctx.lineTo(this.rightX, this.bottomY - 5*shift);
     ctx.lineTo(this.leftX, this.bottomY + 5*shift);
     ctx.fill();
     ctx.translate(0, 15);
   }
}

module.exports = Player;
