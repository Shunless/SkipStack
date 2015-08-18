/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

/**
 *
 * @class Cell
 * @constructor
 * @param world_position.x (number)
 * @param world_position.y (number)
 * @param cell's HashId (string)
 * @param cell's color (web color)
 */
Cell = function (_posX, _posY, _name, _color) {
    this.color = _color;
    this.positionX = _posX;
    this.positionY = _posY;

    this.HashId = _name;

    //the object that holds the rectangle
    this.rect;
    //.init is being used as constructor
    this.init();

    /* indicates the type of the cell/container
     * $    1-Normal    $
     * $    2-Enemy     $
     * $    3-Actor     $
     * Default value is normal
     */
    this.type = 'Normal';
    this.isMarked = false;

    this.isFilterEnabled = false;

    //if gametype is PaintStack cells ll keep a special
    //value indicating their generated color\
    this.genColor = '#000';
};

Cell.prototype = {

    /**
     * Should be over-ridden.
     * @method Cell#init
     */
    init: function () {
        this.rect = new Phaser.Rectangle(this.positionX, this.positionY, grid.cellWidth, grid.cellWidth);
    },

    /**
     * Set the type of this particular cell.
     * @method Cell#setCellType
     * @param {string} _type - Type of the cell.
     */
    setCellType: function (_type) {
        if (_type != 'Normal' && _type != 'Enemy' && _type != 'Actor') {
            alert('type can only be "Enemy","Normal","Actor"');
        }
        this.type = _type;
    },

    /**
     * Render the cell on the screen.
     * @method Cell#render
     */
    render: function () {
        if (this.isFilterEnabled === false) {
            game.debug.geom(this.rect, this.color);
        }
    },

    /**
     * Set the color of this particular cell.
     * @method Cell#setColor
     * @param {string} _type - Color of the cell.
     */
    setColor: function (_clr) {
        this.color = _clr;
    },

    /**
     * Make visible a backround filter inside cell's region.
     * @method Cell#EnableFilter
     */
    EnableFilter: function () {
        this.isFilterEnabled = true;

        this.rect = game.add.sprite(this.positionX, this.positionY);
        this.rect.width = cellWidth;
        this.rect.height = cellHeight;

        this.rect.filters = [filter];
    },

    /**
     * Check if can move towards the given direction.
     * @method Cell#checkCell
     * @param {string} _direction - Direction you want to move.
     * @param {number} _currentPos - Current cell's posiion.
     */
    checkCell: function (_direction, _currentPos) {
        var result = true;
        var i;
        switch (_direction) {
            case 'up':
                if (_currentPos < cellsCntX) {
                    result = false;
                } else {
                    result = true;
                }
                //grid.cell[_currentPos - cellsCntX]

                break;
            case 'down':
                //if > CellsCountX*CellsCountY-CellsCountX
                if (_currentPos > (cellsCntX * grid.cellsCountY) - cellsCntX) {
                    result = false;
                } else {
                    result = true;
                }
                //grid.cell[_currentPos + cellsCntX]

                break;
            case 'left':

                for (i = 0; i < cellsCntX; i++) {
                    if (_currentPos === cellsCntX * i) {
                        result = false;
                    }
                }
                if (result === false) {
                    break;
                } else {
                    result = true;
                }

                //grid.cell[_currentPos-1]

                break;
            case 'right':

                for (i = 0; i < cellsCntX; i++) {
                    if (_currentPos === (cellsCntX * i - 1)) {
                        result = false;
                    }
                }
                if (result === false) {
                    break;
                } else {
                    result = true;
                }

                //grid.cell[_currentPos+1]

                break;
            default:
                break;
        }

        return result;
    }

};

Cell.prototype.constructor = Cell;
