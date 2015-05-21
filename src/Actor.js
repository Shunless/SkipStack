/**
 * @author Alex Mourtziapis
 */

function Actor(_color1,blockID){
  //the color of the actor
  this.color = _color1;
  //
  if (typeof(blockID)==='undefined')
    this.block = Math.floor(cellsCntX/2)+ '-' + Math.floor(cellsCntX/2);
  else
    this.block = blockID;

  this._c ;

  this.enemiesKilled = 0;
}

Actor.prototype.init = function(){
  this._c =  grid.getCell(this.block);

  grid.cell[this._c].setColor(this.color);
  grid.cell[this._c].setCellType('Actor');
};

Actor.prototype.move = function(SwipeType){
  switch(SwipeType){
    case 'top':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)){
        //Handle Top Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c - cellsCntX;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Actor');
      }

      break;
    case 'bottom':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)){
        //Handle Bottom Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c + cellsCntX;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Actor');
      }

      break;
    case 'left':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)){
        //Handle Left Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c - 1;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Actor');
      }

      break;
    case 'right':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)){
        //Handle Right Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c + 1;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Actor');
      }

      break;
    default:
      break;
  }
};
