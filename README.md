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
    Whenever identical numbers are added together (e.g. tile "2" + tile "2" = tile "4") that sum is added to your score. Any tiles that haven't been added together (i.e. tile "2") are not part of your score.

  1. When do tiles enter the game?
    When you hit an arrow key *and* the tiles move (i.e. have space), a new tile is introduced to the board.

  1. How do you know if you've won?
    When one of the tiles' sum is equal to 2048.

  1. How do you know if you've lost?
    When the entire board is filled with tiles and none of them can be merged.

  1. What makes tiles move?
    Keystrokes of the up, down, left, and right arrow keys.

  1. What happens when they move?
    All the tiles shift as far in that direction as possible. Tiles of the same value merge together and display their sum (your score is also updated). A new tile, if there is space *and* movement, is introduced to the board.

  1. How would you know how far a tile should move?
    It moves as far in the keystroke direction until it hits the edge of the board game or another tile (at that point it'd merge or sit next to it).

  1. How would you know if tiles would collide?
    When the adjacent tile has the same value.

  1. What happens when tiles collide?
    The **two** (and only the two) tiles collide and create a tile of their sum.

- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
