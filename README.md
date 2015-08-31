# Pair Project: 2048 - Corinne and Jeri
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
    - adds the points for any new tile created by collision
      - the points being the value of any new tile (when two 2s become a 4, we get 4 points)
  1. When do tiles enter the game?
    - on every action (arrow press), a 2 appears
    - you start with two 2s
  1. How do you know if you've won?
    - you perform an action that creates a 2048 tile
    - display message
  1. How do you know if you've lost?
    - board is full & no legal actions remain
    - display message
  1. What makes tiles move?
    - arrow press (left, down, up right)
  1. What happens when they move?
    - all tiles that can move in pressed direction move as far as they can in that direction
    - collisions in that direction are resolved (scored & combined)
    - a new tile enters the arena (see #2)
  1. How would you know how far a tile should move?
    - it will move until it hits a filled space or the edge of the board
    - if it hits a tile with the same number, a collision will occur
    - it only resolves one collision, preferring the one furthest in the direction the player presses
    - if you press the left arrow, it starts calculating from the left side
      - 2 2 4 4 -> 2 4 _ _
  1. How would you know if tiles would collide?
    - see questions
  1. What happens when tiles collide?
    - update score
    - delete one tile
    - update value of remaining tile
- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
