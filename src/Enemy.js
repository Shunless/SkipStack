/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

//@param string , string
function Enemy(_color1, blockID) {
  //the color of the Enemy
  this.color = _color1;
  //
  if (typeof(blockID) === 'undefined')
    alert('Error : "blockID" is undefined');
  else
    this.block = blockID;


  this.isDead = false;
  this._c;
  grid.cell[grid.getCell(this.block)].type = 'Enemy';
}

//$    INITIALIZATION    $
Enemy.prototype.init = function() {
  this._c = grid.getCell(this.block);

  grid.cell[this._c].setColor(this.color);
  grid.cell[this._c].setCellType('Enemy');
};

//$   POSITION UPDATE FUNCTION    $
// *--# $  deprecated funtion $ #--*
//Enemy.prototype.update = function() {
//  if (this.isDead == true)
//    return null;
//
//  var CellsInt = actor._c - this._c;
//  var RowsInt = Math.abs(grid.getRow(actor._c) - grid.getRow(this._c));
//
//  //Enemy is ahead you
//  if (CellsInt < 0) {
//    if (RowsInt > 0) {
//      this.move('top');
//    } else {
//      if (this._c > actor._c) {
//        this.move('left');
//      } else {
//        this.move('right');
//      }
//    }
//  }
//  //Enemy has the same position with Enemy
//  else if (CellsInt === 0) {
//    gameOver();
//  }
//  //Enemy is behind you
//  else {
//    if (RowsInt > 0) {
//      this.move('bottom');
//    } else {
//      if (this._c > actor._c) {
//        this.move('left');
//      } else {
//        this.move('right');
//      }
//    }
//  }
//};

//$   MOVE FUNCTION    $
//@param string
Enemy.prototype.move = function(SwipeType) {
  switch (SwipeType) {
    case 'top':
      if (grid.cell[this._c].checkCell(SwipeType, this._c) && grid.cell[this._c - cellsCntX].type !== 'Enemy') {

        //Handle Top Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c - cellsCntX;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Enemy');
      }

      break;
    case 'bottom':
      if (grid.cell[this._c].checkCell(SwipeType, this._c) && grid.cell[this._c + cellsCntX].type !== 'Enemy') {

        //Handle Bottom Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c + cellsCntX;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Enemy');
      }

      break;
    case 'left':
      if (grid.cell[this._c].checkCell(SwipeType, this._c) && grid.cell[this._c - 1].type !== 'Enemy') {

        //Handle Left Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c - 1;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Enemy');
      }

      break;
    case 'right':
      if (grid.cell[this._c].checkCell(SwipeType, this._c) && grid.cell[this._c + 1].type !== 'Enemy') {

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

Enemy.prototype.Nextmove = function() {
  var CellsInt = actor._c - this._c;
  var RowsInt = Math.abs(grid.getRow(actor._c) - grid.getRow(this._c));

  //Enemy is ahead you
  if (CellsInt < 0) {
    if (RowsInt > 0) {
      return ('top');
    } else {
      if (this._c > actor._c) {
        return ('left');
      } else {
        return ('right');
      }
    }
  }
  //Enemy has the same position with Enemy
  else if (CellsInt === 0) {
    gameOver();
  }
  //Enemy is behind you
  else {
    if (RowsInt > 0) {
      return ('bottom');
    } else {
      if (this._c > actor._c) {
        return ('left');
      } else {
        return ('right');
      }
    }
  }
}
