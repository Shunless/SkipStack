/**
 * @author Alex Mourtziapis
 */
var blips_sfx = jsfxlib.createWave(["square",16.0000,1.0000,0.0000,0.1480,0.0000,0.1480,20.0000,750.0000,2400.0000,0.0000,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.5000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.1000,0.0000]);
//blips_sfx.play();

//editor/runtime window scale
var Editor_Width = 512;
var Editor_Height = 512;
//the aspect ratio of the screen
var aspect_ratio = Editor_Width / Editor_Height;
//world bounds
var World_bounds_x = Editor_Width;
var World_bounds_y = Editor_Height;
//amount of cells in grid
var cellsCntX = 7;
var cellsCntY = 7;
//cell scale in pixels
var cellWidth = (Editor_Width - (2*cellsCntX + 2)) / (cellsCntX);
var cellHeight = (Editor_Width - (2*cellsCntY + 2)) / (cellsCntY);
//$ phaser game instance
var game = new Phaser.Game(Editor_Width, Editor_Height, Phaser.AUTO, 'SkipStack', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

//-----$*********$-----
//-----$ CLASSES $-----
//-----$*********$-----

var color = new Color();
//Grid(cellsX,cellsY,CellWidth,CellHeight,Color of the grid)
var grid = new Grid(cellsCntX, cellsCntY, cellWidth, cellHeight, '#333', '#ffffff');
//Actor(color of the actor)
var actor = new Actor('#006400');
//Enemy(color of the enemy,spawning cell)
var enemiesColor = '#b50000';
var enemy = [new Enemy(enemiesColor,'0-0'),
             new Enemy(enemiesColor,(cellsCntX-1)+'-0'),
             new Enemy(enemiesColor,(cellsCntX-2)+'-'+(cellsCntY-2))];

/*~~~~~$*********$~~~~~*/
/*~~~~~$ CLASSES $~~~~~*/
/*~~~~~$*********$~~~~~*/

//$ preload function $
function preload() {

}
//$ create function $
function create() {
    game.add.plugin(Phaser.Plugin.Debug);

    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);

    grid.init();
    actor.init();
    for(var i=0;i<enemy.length;i++)
      enemy[i].init();
}
//$ game loop $
function update() {

}
//$ render loop $
function render() {
    grid.render();
}
