# Shanna & Alice -- Pair Project: 2048
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
    - If you merge two tiles, your score increase by the sum of the two tiles.
    - eg. 2 and 2 gets you 4 points.
    - You get points for all merges that happen in a turn.

  1. When do tiles enter the game?
    - A new tile appears after you pick a direction to move.
    - The direction you pick needs to make at least some tiles move or merge.

  1. How do you know if you've won?
    - You win when you get the 2048 tile.

  1. How do you know if you've lost?
    - You lose when you can't merge any tiles in any direction and all of the spaces are filled.

  1. What makes tiles move?
    - When there's one or more empty spaces in that direction, a tile will move as far as it can and merge (once) if it can.
    - Or, if it's next to a tile it can merge with, it will merge into that tile.

  1. What happens when they move?
    - They move as far as possible, and merge if possible.
    - (Merges happen in order from the edge of the board in.)
    - And a new tile appears.

  1. How would you know how far a tile should move?
    - A tile will move to the farthest empty space in the direction moved.
    - And the tile will merge if it can, and that merged tile stays in the farthest available space.

  1. How would you know if tiles would collide?
    - Tiles will collide if they touch on the side opposite to the direction pressed.
    - eg. If you move up, a tile will merge with another tile in the same column above it.

  1. What happens when tiles collide?
    - They produce a tile whose value is the sum of the collided tiles.
    - The new tile is as far over as it can go in the direction of movement.
    - Tiles won't collide twice in one turn.
    - Farthest tiles take priority in merges.
      - eg. If a whole column is filled with 2s, and you press up, you get a 4 in the top space, and another 4 below it.
    - Things can merge after moving
      - eg. you have a 2 in the bottom space, and there's a 2 in the top space, you'll end up with a 4 in the top space.
    - Maybe the game has a sequence of steps that can happen in each turn, and it does all the ones it can, with a rule that you can't merge any particular tile twice (A merged tile can't merge?).


- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
  - Deliverables:
    - Scoring
    - Win/Lose
    - Turn:
      - Moving
      - Collision
      - New Tile
      
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
