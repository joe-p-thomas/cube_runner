/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const canvas = document.getElementById('root');
	  canvas.width = window.innerWidth * .99;
	  canvas.height = window.innerHeight * .96;
	
	  const game = new Game(canvas);
	  game.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Obstacle = __webpack_require__(2);
	const Player = __webpack_require__(3);
	const key = window.key;
	
	class Game {
	  constructor(canvas) {
	    this.windowWidth = canvas.width;
	    this.windowHeight = canvas.height;
	    this.ctx = canvas.getContext("2d");
	
	    this.player = new Player(this.windowWidth, this.windowHeight);
	    this.obstacles = [];
	    this.score = 0;
	  }
	
	  start() {
	    this.render();
	    return this.score;
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
	
	    if (!this.checkCollissions()) {
	      setTimeout(() => this.render(step), 1000/60);
	    }
	  }
	
	  renderScore(step) {
	    this.score = Math.round(step/10);
	    this.ctx.font= '20px Arial';
	    this.ctx.fillStyle = 'black';
	    this.ctx.fillText(this.score, 10, 20);
	  }
	}
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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
	    this.width *= 1.015;
	    this.height *= 1.015;
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map