# Michelle and Loraine - Pair Project: 2048
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
    - The sum of all merges gets added at the end of your turn
  1. When do tiles enter the game?
    - At start of game, board generates a pair: (2 and 2) or (2 and 4) or (4 and 4) in random spots
    - Every turn generates a new tile (2 or 4)
  1. How do you know if you've won?
    - After you merge two tiles of 1024, then an alert will say you've won!
  1. How do you know if you've lost?
    - You're unable to make a move because all tile positions are full and there are no matching tiles near each other (which would indicate additional moves)
  1. What makes tiles move?
    - Key down function associated with the arrow keys
  1. What happens when they move?
    - All tiles with available space move in the corresponding keypress direction until they can't move anymore (due to board limitations)
    - They all scoot at the same time and maintain their order
    - A new tile (2 or 4) appears in a random empty space on the opposite side of the direction of your original keypress
  1. How would you know how far a tile should move?
    - Check the direction it's going
    - Count the number of empty tiles in that direction
  1. How would you know if tiles would collide?
    - Check the direction
    - Look at the first tile that lies in its path
  1. What happens when tiles collide?
    - Compare whether the moving tile matches with the tile it collided with
    - If they are the same number, they will be added together. The merge occurs at the direction chosen.
    - If they're not the same, they stack together
    - A new tile is randomly generated in an empty space on the opposite side of the keypress.
- √ Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
