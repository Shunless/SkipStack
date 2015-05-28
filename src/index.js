/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */
/*
 * 1-$ Normal      # w/h beatlock
 * 2-$ Endless     # w/h beatlock
 * 3-$ SkipSmash   # w/h beatlock
 * 4-$ PaintStack  # w/h beatlock
 */

var GameType = 'Normal';
var beatRate = 1000;

var blips_sfx = jsfxlib.createWave(["sine", 0.0000, 0.4000, 0.0000, 0.0920, 0.0000, 0.2080, 20.0000, 286.0000, 2400.0000, -0.6740, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0480, 0.0000]);

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

//Enemy(color of the enemy,spawning cell)
var enemiesColor = '#b50000';

var gameStateRestarts = 0;

//-----$*********$-----
//-----$ CLASSES $-----
//-----$*********$-----

var color;
var grid;
var actor;
var enemy;
//indicates what s the next move gonna be(*sring)
var enemyMove;
var movesHaveBeenStored;

/*~~~~~$*********$~~~~~*/
/*~~~~~$ CLASSES $~~~~~*/
/*~~~~~$*********$~~~~~*/

//$ phaser game instance
var game; /*= new Phaser.Game(Editor_Width, Editor_Height, Phaser.AUTO, 'SkipStack', {
  preload: preload,
  create: create,
  update: update,
  render: render
});*/


//$ preload function $
function preload() {
  enemy = new Array();
  enemyMove = new Array();
  movesHaveBeenStored = false;
  cellWidth = (Editor_Width - (2 * cellsCntX + 2)) / (cellsCntX);
  cellHeight = (Editor_Width - (2 * cellsCntY + 2)) / (cellsCntY);
}
//$ create function $
function create() {
  color = new Color();
  //Grid(cellsX,cellsY,CellWidth,CellHeight,Color of the grid)
  grid = new Grid(cellsCntX, cellsCntY, cellWidth, cellHeight, '#333', '#ffffff', 2);
  //Actor(color of the actor)
  actor = new Actor('#006400');

  if (GameType === 'Normal') {
    //Do Something
  }

  //add profiler
  //- https://github.com/englercj/phaser-debug -
  //game.add.plugin(Phaser.Plugin.Debug);

  // Set up handlers for mouse events
  game.input.onDown.add(mouseDragStart, this);
  game.input.onUp.add(mouseDragEnd, this);
  game.input.onDown.add(mouseDragStart, this);
  //  game.input.addMoveCallback(mouseDragMove, this);
  game.input.onUp.add(mouseDragEnd, this);

  //grid initialization ("geometry draw call")
  grid.init();
  //actor initialization ("geometry draw call")
  actor.init();

  //enemies initialization ("geometry draw call")
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

  //enemy initialization ("geometry draw call")
  for (var x = 0; x < enemy.length; x++)
    enemy[x].init();

  EnemyMoveTimeout = game.time.time - beatRate/4;
}
//$ game loop $
function update() {
  if (game.time.time > EnemyMoveTimeout) {
    for (var i = 0; i < enemy.length; i++)
      enemy[i].move(enemyMove[i]);

    //this function triggers the sfx player
    //blips_sfx.play();
    movesHaveBeenStored = false;
    
    EnemyMoveTimeout = game.time.time + beatRate;
  } else if (movesHaveBeenStored === false) {
    //We reset the predicted moves array
    enemyMove = new Array();
    
    for (var x = 0; x < enemy.length; x++)
      enemyMove.push(enemy[x].Nextmove());

    movesHaveBeenStored = true;
  }

}
//$ render loop $
function render() {
  //draws cells and grid $ 1st Draw Call $
  grid.render();
  //debug text draw calls
  game.debug.text('grid: ' + cellsCntX + '-' + cellsCntY, 3, 14, '#b1ff00');
  game.debug.text('enemies: ' + enemy.length, 3, 27, '#b1ff00');
  game.debug.text('beat rate: ' + beatRate + ' ms', 3, 40, '#b1ff00');
}
//$ game over $
function gameOver() {
  if (GameType === 'Normal') {
    //increment cells by 1 if enemies > ceil(cells/2)
    if (enemy.length > Math.ceil(cellsCntX / 2))
      cellsCntY = ++cellsCntX;

    gameStateRestarts++;
    game.state.start(game.state.current);
  } else if (GameType === 'Endless') {

    //Everything goes back to normal
    cellsCntY = cellsCntX = 7;
    gameStateRestarts = 0;

    game.state.start(game.state.current);
  } else if (GameType === 'SkipSmash') {

    //@ToDo
  } else if (GameType === 'PaintStack') {

    //@ToDo
  }
}
