# Kari & Elsa

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
    -score increments when tiles combine
    -increment by the sum of those two combining tiles
  1. When do tiles enter the game?
    -After each keydown the user makes that results in some kind of tile movement
    -Enters at a random empty space
    -Adds a '2' (sometimes a '4', but we'll do '2' for now)
  1. How do you know if you've won?
    -When one of your tiles reaches 2048
  1. How do you know if you've lost?
    -When all of your spaces are filled with numbered tiles and no collisions can be made
  1. What makes tiles move?
    -up/down/left/right arrow keydowns
  1. What happens when they move?
    -tiles move as far in the arrow'd direction until they reach the edge of the board or another tile (skipping empty spaces)
    -if the tile they reach is the same value, they combine into one tile with the value of their sum
    -another tile is added to the board
  1. How would you know how far a tile should move?
    -tiles move as far in the arrow'd direction until they reach a wall or another tile (skipping empty spaces)
    -loop through the row/column indexes to check things
  1. How would you know if tiles would collide?
    -if the tile they reach is the same value, they combine into one tile with the value of their sum
  1. What happens when tiles collide?
    -if they have the same value, they combine into one tile with the value of their sum
    
- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
