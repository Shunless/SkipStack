/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

/**
 *
 * @class Actor
 * @constructor
 * @param actor's color (Web color)
 * @param actor's cell HashId (string)
 */
Actor = function (_color1, blockID) {
    //actor's color
    this.color = _color1;
    //actor's HashId
    if (typeof (blockID) === 'undefined') {
        this.block = Math.floor(cellsCntX / 2) + '-' + Math.floor(cellsCntX / 2);

    } else {
        this.block = blockID;
    }

    //actor's position in grid.cell
    this._c = 0;

    //enemies killed
    this.enemiesKilled = 0;

    //indicates how much of the grid has been marked %
    this.markedArea = 0;
};

Actor.prototype = {

    /**
     * Should be over-ridden.
     * @method Actor#init
     */
    init: function () {
        this._c = grid.getCell(this.block);

        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Actor');
    },

    /**
     * Make the actor move towards a direction of your choice.
     * @method Actor#move
     * @param {string} SwipeType - Direction to move.
     */
    move: function (SwipeType) {
        if (SkipStack.isCountdownEnabled === true) {
            return console.log("Can't move while game is loading!");
        }
        //////////////////////////////////////////////////////////////////////////////
        // NORMAL & ENDLESS & PAINTSTACK GAME TYPE
        //////////////////////////////////////////////////////////////////////////////
        if (GameType !== 'SkipSmash') {

            switch (SwipeType) {
                //Handle Up Swap
                case 'up':
                    this.makeMove(SwipeType, this._c - cellsCntX);

                    break;
                    //Handle Down Swap
                case 'down':
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
                //Handle Up Swap
                case 'up':
                    this.thrustEnemy(SwipeType, this._c - cellsCntX);

                    break;
                    //Handle Down Swap
                case 'down':
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
    },

    /**
     * Update grid's cells
     * @method Actor#makeMove
     * @param {string} dir - latest actor's move
     * @param {number} z - the cell that actor is supposed to go.
     */
    makeMove: function (dir, z) {
        if (grid.cell[this._c].checkCell(dir, this._c)) {
            // do nothing
        } else if (SkipStack.hasBounds === false) {
            switch (dir) {
                //Handle Up Swap
                case 'up':
                    z = this._c + cellsCntX * cellsCntY - cellsCntX;
                    break;
                    //Handle Down Swap
                case 'down':
                    z = this._c - cellsCntX * cellsCntY + cellsCntX;
                    break;
                    //Handle Left Swap
                case 'left':
                    z = this._c + cellsCntX - 1;
                    break;
                    //Handle Right Swap
                case 'right':
                    z = this._c - cellsCntX + 1;
                    break;
                default:

                    break;
            }
        }

        if (grid.cell[z].type === 'Enemy') {
            for (var i = 0; i < enemy.length; i++) {
                if (enemy[i]._c === z) {
                    // if is ! the last enemy
                    if (enemy.length != 0 && SkipStack.soundsOn) {
                        hit_sfx[getRandomInt(0, hit_sfx.length)].play();
                    }
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
                grid.cell[this._c].genColor = color.genetaHSLColor_Angle([
                    {
                        minAngle: 320,
                        maxAngle: 359
                        },
                    {
                        minAngle: 0,
                        maxAngle: 40
                        },
                    {
                        minAngle: 70,
                        maxAngle: 160
                        }
                    ]);
                grid.cell[this._c].isMarked = true; //mark the cell as painted
            }
            grid.cell[this._c].setColor(this.color);
            grid.cell[this._c].setCellType('Actor');

        }
    },

    /**
     * Thrust enemy towards a given direction
     * @method Actor#thrustEnemy
     * @param {string} dir - latest actor's move
     * @param {number} z - the cell that actor is supposed to go.
     */
    thrustEnemy: function (dir, z) {
        //if actor can move at the given direction
        if (grid.cell[this._c].checkCell(dir, this._c)) {
            //if on his path there is an enemy
            if (grid.cell[z].type === 'Enemy') {
                for (var i = 0; i < enemy.length; i++) {
                    if (enemy[i]._c === z) {
                        // if is ! the last enemy
                        if (enemy.length != 0 && SkipStack.soundsOn) {
                            thrustEnemy.play();
                        }
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
    }

};

Actor.prototype.constructor = Actor;
