/**
 * @author Alex Mourtziapis
 */

function Enemy(_color1,blockID){
  //the color of the Enemy
  this.color = _color1;
  //
  if (typeof(blockID)==='undefined')
    alert('Error : "blockID" is undefined');
  else
    this.block = blockID;

  this._c ;
}

//$    INITIALIZATION    $
Enemy.prototype.init = function(){
  this._c =  grid.getCell(this.block);

  grid.cell[this._c].setColor(this.color);
  grid.cell[this._c].setCellType('Enemy');
};

//$   POSITION UPDATE FUNCTION    $
Enemy.prototype.update = function(){
  var CellsInt = actor._c - this._c;
  var RowsInt = Math.abs(grid.getRow(actor._c) - grid.getRow(this._c)) ;

  //Enemy is ahead you
  if(CellsInt<0){
    if(RowsInt>0){
      this.move('top');
    }
    else{
      if(this._c>actor._c){
        this.move('left');
      }
      else{
        this.move('right');
      }
    }
  }
  //Enemy has the same position with Enemy
  else if(CellsInt === 0){
    alert("He's Dead, Romane!");
  }
  //Enemy is behind you
  else{
   if(RowsInt>0){
      this.move('bottom');
    }
    else{
      if(this._c>actor._c){
        this.move('left');
      }
      else{
        this.move('right');
      }
    }
  }
};

//$   MOVE FUNCTION    $
Enemy.prototype.move = function(SwipeType){
  switch(SwipeType){
    case 'top':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)){
        //Handle Top Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c - cellsCntX;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Enemy');
      }

      break;
    case 'bottom':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)==true){
        //Handle Bottom Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c + cellsCntX;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Enemy');
      }

      break;
    case 'left':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)==true){
        //Handle Left Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c - 1;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Enemy');
      }

      break;
    case 'right':
      if(grid.cell[this._c].checkCell(SwipeType,this._c)==true){
        //Handle Right Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c + 1;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Enemy');
      }

      break;
    default:
      break;
  }
};
