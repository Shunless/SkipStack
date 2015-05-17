/**
 * @author Alex Mourtziapis
 */

//editor/runtime window scale
var Editor_Width = 720/2;   //GALAXY S3 Neo res divided by 2
var Editor_Height = 720/2;
//the aspect ratio of the screen
var aspect_ratio = Editor_Width/Editor_Height;
//world bounds
var World_bounds_x = Editor_Width;
var World_bounds_y = Editor_Height;
//amount of cells in grid
var cellsCntX = 7;
var cellsCntY = 7;
//cell scale in pixels
var cellWidth = (Editor_Width/1.05)/cellsCntX;
var cellHeight = (Editor_Width/1.05)/cellsCntY;
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
}
//$ game loop $
function update() {

}
//$ render loop $
function render() {
    grid.render();
}
