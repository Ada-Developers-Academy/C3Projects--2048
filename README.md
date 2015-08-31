# Brandi & Brittany # Pair Project: 2048
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
    1. Every time two tiles merge, the outcome gets added to score.
  2. When do tiles enter the game?
    1. When you hit an arrow key, after the merging has happened.
    2. It is randomly placed in an open slot.
  3. How do you know if you've won?
    1. Popup appears when you create the 2048 tile.
  4. How do you know if you've lost?
    1. The board is filled.
    2. There are no moves left (there are no two similar numbers next to each other).
  5. What makes tiles move?
    1. The arrow keys.
  6. What happens when they move?
    1. They move in the arrow direction if there is space.
    2. They merge with tiles that have the same value in that direction.
      Ex. If 4s are next to each other on the bottom row,
          and you press the left arrow, the right 4 will
          merge with the left 4, and become 8.
    3. The merge is one to one (as in three tiles cannot merge together).
  7. How would you know how far a tile should move?
    1. The tile cannot go further than the board (4 x 4 tiles).
    2. They are blocked by dissimilar tiles.
    3. They must merge with similar tiles in the arrow direction.
  8. How would you know if tiles would collide?
    1. Take the direction of the arrow and start on that side of the grid.
    2. If the number to the opposite direction is the same, merge.
    3. If there is an empty space in the arrow direction,
       move the tiles in that direction until they hit the grid
       edge OR another tile (that cannot be merged).
  9. What happens when tiles collide?
    1. If they're the same value, you sum them.
    2. If they are not the same value they don't overlap.
- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
