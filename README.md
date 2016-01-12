# Anita && Victoria
# Pair Project: 2048
For this project, we will be working in pairs to create a clone of the super-fun browser based game [2048](http://gabrielecirulli.github.io/2048/).

You will not use or reference of of the code or assets in the original or any clones, forks, remakes, extensions, or modifications of 2048. This one is yours. Own it.

This repo provides a bare minimum of markup, styles, and javascript. It's enough to get you going, but it's likely that your implementation will require significant extension and modification of the provided assets.

## Project Deliverables
Recreate as much of the original game as is reasonable in the one week we have alotted for this project. Focus on completing and delivering individual chunks of functionality. This is an ambitious project, so allocate your time wisely and focus on understanding the _how_ and _why_ of the code you write.

### Learning Goals
- Organzizing JavaScript functionality into maintainable objects.
- Exploring how HTML, CSS, and JavaScript work together to create a memorable user experience.
- Defining units of work--individually deliverable components--that can be ordered, scoped, and scheduled.
- Make things zoom around a grid with math and stuff.

### Project Baseline
- Play a couple games of [2048](http://gabrielecirulli.github.io/2048/). Think about everything that's likely happening in the code to support what's happening on the screen. Once you've got a feel for the game, talk with your pair and answer the following questions:
  1. How does scoring work?
      _Any time two tiles are added, the sum of the two tiles is added to the score. For example, two '2' tiles add up to '4', which is then added to the score._

  1. When do tiles enter the game?
      _One tile of value '2' or '4' (rarely) is added to the game board with every arrow key press_

  1. How do you know if you've won?
      _A player wins once they have a tile with a value of '2048'_

  1. How do you know if you've lost?
      _A player loses once the board is completely filled, no moves are available, and no tile is of the value '2048'_

  1. What makes tiles move?
      _The tiles move according to the arrow key that is pressed. If there is a tile in its way and it is not the same value, that tile will not move. Otherwise, if it is the same value, these two tiles will be added to create a tile with its added value._

  1. What happens when they move?
      _See above_

  1. How would you know how far a tile should move?
      _See above_

  1. How would you know if tiles would collide?
      _Tiles of the same value and color will collide into a single tile with the value of their sum._

  1. What happens when tiles collide?
      _Tiles of the same value and color will collide into a single tile with the value of their sum. Tiles with different values will move in the direction of the arrow key pressed until there is no space left._

- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
