//editor/runtime window scale
var Editor_Width = 720/2;   //GALAXY S3 Neo res divided by 3
var Editor_Height = 1280/2;
var aspect_ratio = Editor_Width/Editor_Height;

var World_bounds_x = 10000;
var World_bounds_y = 2000;

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

var color = Color();
//Grid(cellsX,cellsY,CellWidth,CellHeight,Color of the grid)
var grid = new Grid(5, 5 , 50, 5, '#0fffff');


/*~~~~~$*********$~~~~~*/
/*~~~~~$ CLASSES $~~~~~*/
/*~~~~~$*********$~~~~~*/

//$ preload function $
function preload() {

}
//$ create function $
function create() {
    game.add.plugin(Phaser.Plugin.Debug);

    grid.init();
}
//$ game loop $
function update() {

}
//$ render loop $
function render() {
    grid.render();
}
