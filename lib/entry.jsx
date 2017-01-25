const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('root');
  canvas.width = window.innerWidth * .99;
  canvas.height = window.innerHeight * .96;

  const promptNewGame = (score) => {
    document.getElementById('score').innerHTML = score;
    gameOver.className = 'shown';
  };
  const game = new Game(canvas, promptNewGame);

  const menu = document.getElementById('menu');
  const startButton = document.getElementById('start');
  startButton.addEventListener('click', () => {
    menu.className = 'hidden';
    game.start();
  });

  const gameOver = document.getElementById('game_over');
  const retryButton = document.getElementById('retry');
  retryButton.addEventListener('click', () => {
    gameOver.className = 'hidden';
    game.start();
  });
});
