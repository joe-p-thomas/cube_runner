# Cuber Runner

## Background
Cube runner is game in which the user steers their vehicle on an open plane, while avoiding the obstacles (cubes). The longer the user goes without hitting anything, the higher score they receive. Once an obstacle is hit, the game is over.

## Functionality
This game will at minimum do the following:
- [ ] A score is kept track of on screen
- [ ] The game can be paused at anytime
- [ ] Once a game is over, it resets so users can play again

## Wireframes
The game view will fill the screen. When the page is first loaded, users will be greeted with a modal. In the modal, there will be simple instructions, and a button to start. During any point in the game the users can pause and the modal will render, with a button for resuming. The score will be shown in the top left corner.
![wireframe](./cube_runner.png)

## Technologies
Cube Runner will be built with Vanilla JavaScript and HTML Canvas. Keymaster.js will be used as well for binding the keys for controls in the game.

## Implementation Timeline
#### Day 1
Render a view with randomly generated rectangles that move closer to the screen. Using Keymaster.js, have controls for steering through the obstacles.

#### Day 2
Have some car/ship icon render in the lower middle of the screen. Have the game check for collisions and keep track of the score.

#### Day 3
Develop the modal. The game will now only start when prompted by the user. Once a game is over, the user will be able to start a new one. 

## Bonus Features
- [ ] Replace the 2D obstacles with 3D ones
- [ ] Different color theme options
- [ ] Potential for an extra game mechanic in which some        obstacles will be colored different and will reward points for hitting it
