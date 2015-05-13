//editor/runtime window scale
var Editor_Width = 800;
var Editor_Height = 600;
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



/*~~~~~$*********$~~~~~*/
/*~~~~~$ CLASSES $~~~~~*/
/*~~~~~$*********$~~~~~*/

//$ preload function $
function preload() {

}
//$ create function $
function create() {

    game.add.plugin(Phaser.Plugin.Debug);


}
//$ game loop $
function update() {

}
//$ render loop $
function render() {

}
