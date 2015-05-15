//editor/runtime window scale
var Editor_Width = 720/2;   //GALAXY S3 Neo res divided by 3
var Editor_Height = 1280/2;
var aspect_ratio = Editor_Width/Editor_Height;

var World_bounds_x = 10000;
var World_bounds_y = 2000;

var cellsCntX = 7;
var cellsCntY = 7;
var cellWidth = (Editor_Width/1.2)/cellsCntX;
var cellHeight = (Editor_Width/1.2)/cellsCntY;
//$ phaser game instance
var game = new Phaser.Game(Editor_Width, Editor_Height, Phaser.AUTO, '', {
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

var actor = new Actor('#ff0000');

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
    actor.render();
}
