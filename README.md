# Pair Project: 2048 - Sally & Ashley!
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

Each time tiles combine, their total value is added to the score (so, if 8 and 8 combine, 16 is added).  

  1. When do tiles enter the game?

Every time tiles move, a new tile is added to a random(?) empty tile. When nothing can move, no tile is added.

  1. How do you know if you've won?

Once you get a 2048 tile, you've won!  

  1. How do you know if you've lost?

If the board is full and you cannot combine any more tiles. It displays "Game Over" and greys out the board. Try again button also displays.

  1. What makes tiles move?

Arrow keys move tiles. Also, h, j, k, l move left, down, up, right, respectively. Same with a, s, w, d (more like arrows) and some other key combos. Lots of options.

(Plan to focus on arrow keys, then add if we finish requirements.)

  1. What happens when they move?

Tiles move as far as they can (filling any empty squares) in the direction of the arrow key without shifting the order. Same numbers combine. Collapsing happens first, meaning that new same numbers will not automatically combine until you hit the arrow key in that direction again.

  1. How would you know how far a tile should move?

When combining creates an empty square, that square is treated the same as if it had started as empty.

There are a few different ways we could go about this, but our plan is as follows:
Each row and column is an array of length 4.
When arrow is pressed:
if R/L, start with row. If Up/Down, start with column.
If R/L:
  1. If row has no empty squares, nothing moves unless they combine. Go to next.
  2. Remove empties in first row or column.
  3. Starting in the furthest position - 1 in the direction of the arrow press, check if next tile (array position) in the direction of the arrow press is the same as the current tile. If so, sum the numbers and put sum in place of those two, in slot in direction of arrowpress. Delete other slot. Iterate this process with remaining array positions.
  4. Fill with empty marker (-, NaN, false?) to make array of length 4. Fill in opposite to arrow press direction.  
  4. Iterate through all rows.
  5. Update columns accordingly. So, first column is made up of all rowN[0]s, etc.

  1. How would you know if tiles would collide?
  see above
  1. What happens when tiles collide?
  see above

- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).

  Our deliverable components:
  - Initialize game: Draw board
  - Initialize game: Place initial tiles (2 tiles, randomly valued 2 and/or 4)
  - Game Play: Shifting tiles (pull/add blanks, update rows/columns, display board)
  - Game Play: Combining tiles  
  - New tiles - new tiles enter the game
  - Scoring   
  - End game

- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
