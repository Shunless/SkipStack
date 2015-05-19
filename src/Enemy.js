/**
 * @author Alex Mourtziapis
 */

function Enemy(_color1,blockID){
  //the color of the Enemy
  this.c = _color1;
  //
  if (typeof(blockID)==='undefined')
    alert('Error : "blockID" is undefined');
  else
    this.block = blockID;

  this._c ;
}

Enemy.prototype.init = function(){
  this._c =  grid.getCell(this.block);

  grid.cell[this._c].setColor(this.c);
  grid.cell[this._c].setCellType('Enemy');
};

Enemy.prototype.move = function(SwipeType){
  switch(SwipeType){
    case 'top':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)){
        //Handle Top Swap

      }

      break;
    case 'bottom':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)==true){
        //Handle Bottom Swap

      }

      break;
    case 'left':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)==true){
        //Handle Left Swap

      }

      break;
    case 'right':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)==true){
        //Handle Right Swap

      }

      break;
    default:
      break;
  }
};
