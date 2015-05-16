function Actor(_color1){
  //the color of the actor
  this.c = _color1;
  //
  this.block  = Math.floor(grid.cellsCountX/2);
}

Actor.prototype.init = function(){
  var _c = grid.getCell(this.block.toString()+'-'+this.block.toString());
  grid.cell[_c].setColor(this.c);
  grid.cell[_c].setCellType('Actor');
};

Actor.prototype.move = function(SwipeType){
    switch(SwipeType){

    }
};
