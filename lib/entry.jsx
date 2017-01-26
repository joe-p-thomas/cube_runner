const Game = require('./game');
const Demo = require('./demo');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('root');
  canvas.width = window.innerWidth * .99;
  canvas.height = window.innerHeight * .96;
  const demo = new Demo(canvas);
  demo.start();

  const promptNewGame = (score) => {
    document.cookie = `high_score=${score}`;
    document.getElementById('score').innerHTML = score;
    gameOver.className = 'shown';
  };
  const game = new Game(canvas, promptNewGame);

  const menu = document.getElementById('menu');
  const startButton = document.getElementById('start');
  startButton.addEventListener('click', () => {
    menu.className = 'hidden';
    demo.pause();
    game.start();
  });

  const gameOver = document.getElementById('game_over');
  const retryButton = document.getElementById('retry');
  retryButton.addEventListener('click', () => {
    gameOver.className = 'hidden';
    game.start();
  });

  const returnButton = document.getElementById('return_menu');
  returnButton.addEventListener('click', () => {
    gameOver.className = 'hidden';
    menu.className = 'shown';
    demo.start();
  });
});
