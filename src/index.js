/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

/* ++++   Supported Game Types  ++++
 * 1-$ Normal      #6 w/h beatlock
 * 2-$ Endless     #7 w/h beatlock
 * 3-$ SkipSmash   #8 w/h beatlock
 * 4-$ PaintStack  #9 w/h beatlock
 */
// Active game type (string)
var GameType = 'SkipSmash';

//beat refresh rate (number)
var beatRate = 1000;
//beat interval in %[0-Min, 100 Max] (string)
var beatInterval = 0;

var EnemyMoveTimeout = 0;

//editor/runtime window scale
var Editor_Width = cellSize * 7;
var Editor_Height = cellSize * 7;
//the aspect ratio of the screen
var aspect_ratio = Editor_Width / Editor_Height;
//world bounds
var World_bounds_x = Editor_Width;
var World_bounds_y = Editor_Height;
//amount of cells in grid
var cellsCntX = 7;
var cellsCntY = 7;
//cell scale in pixels
var cellWidth;
var cellHeight;
//the color of the enemies (string)
var enemiesColor = '#b50000';
//indicates how many times game has been restared. (number)
var gameStateRestarts = 0;

//-----$*********$-----
//-----$ CLASSES $-----
//-----$*********$-----

var color;
var grid;
var actor;
var enemy;

/*~~~~~$*********$~~~~~*/
/*~~~~~$ CLASSES $~~~~~*/
/*~~~~~$*********$~~~~~*/

//indicates what s the next move gonna be(sring)
var enemyMove;
var movesHaveBeenStored;
//indicates the time that the game actually started.(number)*ms
var LoadTime;
//indicates the elapsed time since level load.(number)*s
var timeSinceLevelLoad;
//$ phaser game instance
var game;
//indicates if user lost in the previous session
var justLost = true;
//indicates if the grid has just being expanded
var justExpandedGrid = false;

//$ preload function $
function preload() {
  //Reset Arrays
  enemy = new Array();
  enemyMove = new Array();

  // Set up handlers for mouse events
  game.input.onDown.add(mouseDragStart, this);
  game.input.onUp.add(mouseDragEnd, this);
  game.input.onDown.add(mouseDragStart, this);
  game.input.onUp.add(mouseDragEnd, this);

  movesHaveBeenStored = false;
  cellWidth = (Editor_Width - (border * 2 * cellsCntX + border * 2)) / (cellsCntX);
  cellHeight = (Editor_Width - (border * 2 * cellsCntY + border * 2)) / (cellsCntY);
}
//$ create function $
function create() {
  //add profiler
  //- https://github.com/englercj/phaser-debug -
  //game.add.plugin(Phaser.Plugin.Debug);

  color = new Color();

  //+++++++++++++++++++++++++++++
  //  Grid initialization
  //+++++++++++++++++++++++++++++

  grid = new Grid(cellsCntX, cellsCntY, cellWidth, cellHeight, '#333', '#ffffff', border * 2);
  grid.init();

  //+++++++++++++++++++++++++++++
  //  Actor initialization
  //+++++++++++++++++++++++++++++

  if (justLost === true)
    actor = new Actor('#006400');
  else {
    var _O_ = actor._c;
    actor = new Actor('#006400', grid.cell[_O_].HashId);
  }
  actor.init();

  //+++++++++++++++++++++++++++++
  //  Enemies initialization
  //+++++++++++++++++++++++++++++

  for (var i = 0; i < 3 + gameStateRestarts; i++) {
    var x = '';
    if (randomBoolean[0]() == true) {
      if (randomBoolean[0]() == true)
        x = '0-' + getRandomInt(0, cellsCntY);
      else
        x = getRandomInt(0, cellsCntX) + '-0';
    } else {
      if (randomBoolean[0]() == true)
        x = (cellsCntX - 1) + '-' + getRandomInt(0, cellsCntY);
      else
        x = getRandomInt(0, cellsCntX) + '-' + (cellsCntY - 1);
    }

    if (grid.cell[grid.getCell(x)].type === 'Normal')
      enemy.push(new Enemy(enemiesColor, x));
    else
      i--;
  }

  for (var x = 0; x < enemy.length; x++)
    enemy[x].init();

  EnemyMoveTimeout = game.time.time + beatRate;
  justLost = justExpandedGrid = false;
  LoadTime = game.time.now;
}

// GAME LOOP
function update() {
  if (game.time.time > EnemyMoveTimeout) {

    for (var i = 0; i < enemy.length; i++)
      enemy[i].move(enemyMove[i]);

    //this function triggers the sfx player
    //blips_sfx.play();

    movesHaveBeenStored = false;

    //refresh move timeout
    EnemyMoveTimeout = game.time.time + beatRate;

  } else if (movesHaveBeenStored === false) {

    //We reset the predicted moves array
    enemyMove = new Array();

    for (var x = 0; x < enemy.length; x++)
      enemyMove.push(enemy[x].Nextmove());

    movesHaveBeenStored = true;
  }

  if (GameType === 'Normal' || GameType === 'Endless') {
    //if user has killed all the enemies.
    if (enemy.length === 0)
      expand();
  } else if (GameType === 'SkipSmash') {
    if (enemy.length === 1)
      expand();
  } else if (GameType === 'PaintStack') {
    //@ToDo *Implement PaintStack game type
  }

  //calculate new inteval
  beatInterval = Math.round(((EnemyMoveTimeout - game.time.time) / beatRate) * 100);

  timeSinceLevelLoad = Math.round((game.time.now - LoadTime) / 1000);
}

//$ render loop $
function render() {
  //draws cells and grid $ 1st Draw Call $
  grid.render();
  //debug text draw calls
  game.debug.text('grid: ' + cellsCntX + '-' + cellsCntY, 3, 14, '#b1ff00');
  game.debug.text('enemies: ' + enemy.length, 3, 27, '#b1ff00');
  game.debug.text('beat rate: ' + beatRate + ' ms', 3, 40, '#b1ff00');
  game.debug.text('Interval: ' + beatInterval + ' %', 3, 53, beatInterval < 20 ? '#ff0000' : '#00ff27');
  game.debug.text('time: ' + timeSinceLevelLoad + ' s', 3, 66, '#b1ff00');
}
//$ game over $
//every game type has the same game over.
function gameOver() {
  justLost = true;

  //reset grid back to 7x7
  cellsCntY = cellsCntX = 7;
  gameStateRestarts = 0;
  game.state.start(game.state.current);

  LoadTime = game.time.now;
}
//$ expand " grid " $
function expand() {
  justExpandedGrid = true;

  //NORMAL AND SKIPSMASH GAME TYPES
  if (GameType === 'Normal' || GameType === 'SkipSmash') {
    justLost = true;
    gameStateRestarts++;

    //increment cells by 1 if enemies > ceil(cells/2)
    if ((3 + gameStateRestarts) > Math.ceil(cellsCntX / 2))
      cellsCntY = ++cellsCntX;

    game.state.start(game.state.current);
  }
  //ENDLESS GAME TYPE
  else if (GameType === 'Endless') {
    gameStateRestarts++;

    //increment cells by 1 if enemies > ceil(cells/2)
    if ((3 + gameStateRestarts) > Math.ceil(cellsCntX / 2))
      cellsCntY = ++cellsCntX;

    game.state.start(game.state.current);
  }
  //PAINTSTACK GAME TYPE
  else if (GameType === 'PaintStack') {
    //@ToDo
  }
}
