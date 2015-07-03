/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */
//////////////////////////////////////////////////////////////////////////////
// CLASS ACTOR
//////////////////////////////////////////////////////////////////////////////
//@param actor's color (Web color)
//@param actor's cell HashId (string)
function Actor(_color1, blockID) {
    //actor's color
    this.color = _color1;
    //actor's HashId
    if (typeof(blockID) === 'undefined')
        this.block = Math.floor(cellsCntX / 2) + '-' + Math.floor(cellsCntX / 2);
    else
        this.block = blockID;

    //actor's position in grid.cell
    this._c = 0;

    //enemies killed
    this.enemiesKilled = 0;

    //indicates how much of the grid has been marked %
    this.markedArea = 0;
}

Actor.prototype.init = function() {
    this._c = grid.getCell(this.block);

    grid.cell[this._c].setColor(this.color);
    grid.cell[this._c].setCellType('Actor');
};

Actor.prototype.move = function(SwipeType) {
//////////////////////////////////////////////////////////////////////////////
// NORMAL & ENDLESS & PAINTSTACK GAME TYPE  //////////////////////////////////////////////////////////////////////////////
    if (GameType !== 'SkipSmash') {

        switch (SwipeType) {
            //Handle Top Swap
            case 'top':
                this.makeMove(SwipeType, this._c - cellsCntX);

                break;
                //Handle Bottom Swap
            case 'bottom':
                this.makeMove(SwipeType, this._c + cellsCntX);

                break;
                //Handle Left Swap
            case 'left':
                this.makeMove(SwipeType, this._c - 1);

                break;
                //Handle Right Swap
            case 'right':
                this.makeMove(SwipeType, this._c + 1);

                break;
            default:
                break;
        }
    }
//////////////////////////////////////////////////////////////////////////////
// SKIPSMASH GAME TYPE
//////////////////////////////////////////////////////////////////////////////
    else {

        switch (SwipeType) {
            //Handle Top Swap
            case 'top':
                this.thrustEnemy(SwipeType, this._c - cellsCntX);

                break;
                //Handle Bottom Swap
            case 'bottom':
                this.thrustEnemy(SwipeType, this._c + cellsCntX);

                break;
                //Handle Left Swap
            case 'left':
                this.thrustEnemy(SwipeType, this._c - 1);

                break;
                //Handle Right Swap
            case 'right':
                this.thrustEnemy(SwipeType, this._c + 1);

                break;
            default:
                break;
        }
    }
};

Actor.prototype.makeMove = function(dir, z) {
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
        //set currecnt cell type as normal
        grid.cell[this._c].setCellType('Normal');
        //any game type except Paintstack
        if (GameType !== 'PaintStack') {
            grid.cell[this._c].setColor(grid.c2);

            this._c = z;
            grid.cell[this._c].setColor(this.color);
            grid.cell[this._c].setCellType('Actor');

        }
        //PaintStack game type exclusive
        //@ToDo
        else {

            //current cell hasnt been painted
            if (!grid.cell[this._c].isMarked) {
                grid.cell[this._c].setColor(grid.c2);
            }
            //its painted
            else {
                //set as active color the genCol
                grid.cell[this._c].setColor(grid.cell[this._c].genColor);
            }

            this._c = z;
            //next cell hasnt been painted
            if (!grid.cell[this._c].isMarked) {
                this.markedArea += (1 / (cellsCntX * cellsCntY)) * 100;
                //parse color to genColor for backup purpose
                grid.cell[this._c].genColor = color.genetaHSLColor();
                grid.cell[this._c].isMarked = true; //mark the cell as painted
            }
            grid.cell[this._c].setColor(this.color);
            grid.cell[this._c].setCellType('Actor');

        }
    }
};

Actor.prototype.thrustEnemy = function(dir, z) {
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
