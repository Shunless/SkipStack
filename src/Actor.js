/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

//////////////////////////////////////////////////////////////////////////////
// CLASS ACTOR
//////////////////////////////////////////////////////////////////////////////

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
  //////////////////////////////////////////////////////////////////////////////
// NORMAL & ENDLESS GAME TYPE  //////////////////////////////////////////////////////////////////////////////
  if (GameType === 'Normal' || GameType === 'Endless') {

    switch (SwipeType) {
      //Handle Top Swap
      case 'top':
        this.move2(SwipeType, this._c - cellsCntX)

        break;
        //Handle Bottom Swap
      case 'bottom':
        this.move2(SwipeType, this._c + cellsCntX)

        break;
        //Handle Left Swap
      case 'left':
        this.move2(SwipeType, this._c - 1)

        break;
        //Handle Right Swap
      case 'right':
        this.move2(SwipeType, this._c + 1)

        break;
      default:
        break;
    }
  }
  //////////////////////////////////////////////////////////////////////////////
// SKIPSMASH GAME TYPE
//////////////////////////////////////////////////////////////////////////////
  else if (GameType === 'SkipSmash') {

    switch (SwipeType) {
      //Handle Top Swap
      case 'top':
        this.ThrustEnemy(SwipeType, this._c - cellsCntX);

        break;
        //Handle Bottom Swap
      case 'bottom':
        this.ThrustEnemy(SwipeType, this._c + cellsCntX);

        break;
        //Handle Left Swap
      case 'left':
        this.ThrustEnemy(SwipeType, this._c - 1);

        break;
        //Handle Right Swap
      case 'right':
        this.ThrustEnemy(SwipeType, this._c + 1);

        break;
      default:
        break;
    }
  }
};


Actor.prototype.move2 = function(dir, z) {
  if (grid.cell[this._c].checkCell(dir, this._c)) {

    if (grid.cell[z].type === 'Enemy') {
      for (var i = 0; i < enemy.length; i++) {
        if (enemy[i]._c === z) {
          //enemy[i].isDead = true;
          enemy.splice(i, 1);
          enemyMove.splice(i, 1);
          break;
        }
      }
    }

    grid.cell[this._c].setCellType('Normal');
    grid.cell[this._c].setColor(grid.c2);

    this._c = z;
    grid.cell[this._c].setColor(this.color);
    grid.cell[this._c].setCellType('Actor');
  }
};

Actor.prototype.ThrustEnemy = function(dir, z) {
  //if actor can move at the given direction
  if (grid.cell[this._c].checkCell(dir, this._c)) {
    //if on his path there is an enemy
    if (grid.cell[z].type === 'Enemy') {
      for (var i = 0; i < enemy.length; i++) {
        if (enemy[i]._c === z) {
          //thrust towards the given direction
          enemy[i].Thrust(dir);
          break;
        }
      }
      //if the enemy is not stuck on the border take his postion on the grid
      if (grid.cell[z].checkCell(dir, z)) {
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = z;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Actor');
      }
    } else {
      grid.cell[this._c].setCellType('Normal');
      grid.cell[this._c].setColor(grid.c2);

      this._c = z;
      grid.cell[this._c].setColor(this.color);
      grid.cell[this._c].setCellType('Actor');
    }
  }
};
