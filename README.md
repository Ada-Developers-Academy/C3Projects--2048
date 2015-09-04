# Marleigh and Lindsey # Pair Project: 2048

Link to Trello Board: https://trello.com/b/M9bDT0zB/2048-lindsey-marleigh

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
      Scoring is total of all the collisions. It accumulates in a "+="s style. Eg. if you have two tiles of 4 that collide, you get 8 points.
  2. When do tiles enter the game?
      Every click enter a tile of 2 of 4 in a random empty square.
  3. How do you know if you've won?
      The goal is to reach at least one tile that totals 2048. It's possible to keep going after that number is achieved.
  4. How do you know if you've lost?
      When the grid is full and no tiles can pop up AND a there are no collisions to be made making it impossible to add additional tiles to the grid. 
  5. What makes tiles move?
      Pushing arrow keys on the keyboard currently control tile movement.
  6. What happens when they move?
      All the tiles move as far as they can go in the arrow direction pushed. 
  7. How would you know how far a tile should move?
      If it reaches a boundary of the grid or if it hits a tile that does not have an identical number, it stops. If it hits/collides with a tile WITH an identical number they combine and continue moving as far as they can go in the direction the arrow was pushed.
  8. How would you know if tiles would collide?
      if the tiles have an identical value, they collide and merge.
  9. What happens when tiles collide?
      They merge into a single tile where the face value doubles to reflect the addition of the tiles. New tile takes farthest space.

- Document your answers to these questions in this README.
- Use your discussion and answers to create tasks for a trello board. Organize those tasks into deliverable components (e.e., _Scoring_, _Tile Collision_, _Win/Loss_).
- Open a PR with your discussion notes and answers to the above questions. Include a link to your Trello board. Indicate in the PR which deliverable(s) you are targeting first.
