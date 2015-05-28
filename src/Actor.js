/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

function Actor(_color1, blockID) {
  //the color of the actor
  this.color = _color1;
  //
  if (typeof(blockID) === 'undefined')
    this.block = Math.floor(cellsCntX / 2) + '-' + Math.floor(cellsCntX / 2);
  else
    this.block = blockID;

  this._c;

  this.enemiesKilled = 0;
}

Actor.prototype.init = function() {
  this._c = grid.getCell(this.block);

  grid.cell[this._c].setColor(this.color);
  grid.cell[this._c].setCellType('Actor');
};

Actor.prototype.move = function(SwipeType) {
  switch (SwipeType) {
    //Handle Top Swap
    case 'top':
      if (grid.cell[this._c].checkCell(SwipeType, this._c)) {
        var z = this._c - cellsCntX;

        if (grid.cell[z].type === 'Enemy') {
          for (var i = 0; i < enemy.length; i++)
            enemy[i].isDead = Boolean(enemy[i]._c === z) ;
        }

        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = z;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Actor');
      }

      break;
      //Handle Bottom Swap
    case 'bottom':
      if (grid.cell[this._c].checkCell(SwipeType, this._c)) {
        var z = this._c + cellsCntX;

        if (grid.cell[z].type === 'Enemy') {
          for (var i = 0; i < enemy.length; i++)
            enemy[i].isDead = Boolean(enemy[i]._c === z) ;
        }

        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = z;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Actor');
      }

      break;
      //Handle Left Swap
    case 'left':
      if (grid.cell[this._c].checkCell(SwipeType, this._c)) {
        var z = this._c - 1;

        if (grid.cell[z].type === 'Enemy') {
          for (var i = 0; i < enemy.length; i++)
            enemy[i].isDead = Boolean(enemy[i]._c === z) ;
        }

        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = z;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Actor');
      }

      break;
      //Handle Right Swap
    case 'right':
      if (grid.cell[this._c].checkCell(SwipeType, this._c)) {
        var z = this._c + 1;

        if (grid.cell[z].type === 'Enemy') {
          for (var i = 0; i < enemy.length; i++)
            enemy[i].isDead = Boolean(enemy[i]._c === z) ;
        }

        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = z;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Actor');
      }

      break;
    default:
      break;
  }
};
