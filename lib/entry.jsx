const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('root');
  canvas.width = window.innerWidth * .99;
  canvas.height = window.innerHeight * .96;

  const game = new Game(canvas);
  game.start();
});
