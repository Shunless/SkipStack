/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

/**
 *
 * @class Obstacle
 * @constructor
 * @param Obstacle's color (Web color)
 * @param Obstacle's cell HashId (string)
 */
Obstacle = function (_color1, blockID) {

    //Obstacle's color
    this.color;

    if (typeof (_color1) === 'undefined') {
        console.error('You gotta give a color! \n Setting default color for now!');
        this.color = obstacleColor;
    } else {
        this.color = _color1;
    }

    //Obstacle's HashId
    if (typeof (blockID) === 'undefined') {
        this.block = Math.floor(cellsCntX / 2) + '-' + Math.floor(cellsCntX / 2);
    } else {
        this.block = blockID;
    }

    //Obstacle's position in grid.cell
    this._c = 0;

};

Obstacle.prototype = {

    /**
     * Should be over-ridden.
     * @method Obstacle#init
     */
    init: function () {
        this._c = grid.getCell(this.block);

        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Obstacle');
    }

};

Obstacle.prototype.constructor = Obstacle;
