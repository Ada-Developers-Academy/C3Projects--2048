# Brenna and Carly Pair Project: 2048
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
    - The score is calculated by adding the sum of two "collapsed" cells to the existing score
  1. When do tiles enter the game?
    - Start with two randomly placed tiles of values 2 or 4, new tiles enter the game with each press of an arrow key which values are also either 2 or 4.
  1. How do you know if you've won?
    - A player wins when they create a collapsed cell that equals 2048.
  1. How do you know if you've lost?
    - A player loses if the board is entirely filled and none of the tiles are collapsable.
  1. What makes tiles move?
    - Tiles move when an arrow key is pressed.
  1. What happens when they move?
    - Each tile that can move in the arrow key direction moves as far as possible in that direction.
    - As far as possible means: until it hits another tile or the boundary*
    * Trying to avoid cascading collapses without subsequent arrow presses (8, 4, 4 with a left press should only collapse the 4s together and not the resulting 8 until the left arrow is pressed again).
  1. How would you know how far a tile should move?
    - A tile should move if:
      - The adjacent spot is empty
      - It should not move if it hits one of the row or column boundaries (x(0), y(0), x(3), y(3))
  1. How would you know if tiles would collide?
    - They tiles would collide and collapse if they values of the two tiles match in the direction of the arrow.
  1. What happens when tiles collide?
    - The two tiles collapse into one tile which equals the sum of the two tiles.
    - The summed tile moves as far in that direction as possible (defined above).
- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
