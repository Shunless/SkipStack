/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

function Grid(cellCntX, cellCntY, cellW, cellH, _color1, _color2, _bThickness) {
  this.c = _color1; //border color
  this.c2 = _color2; //cell color

  //the thickness of the border
  if (typeof(_bThickness) === 'undefined')
    this.borderThickness = 2;
  else
    this.borderThickness = _bThickness;

  this.cellsCountX = cellCntX; //cells in x dimension .
  this.cellsCountY = cellCntY; //cells in y dimension .

  this.cellWidth = cellW; //width of every cell in px .
  this.cellHeight = cellH; //height of every cell in px .

  this.grid;

  //the cells of the grid
  this.cell = new Array();
}

Grid.prototype.init = function() {
  var w = this.cellsCountX * this.cellWidth + this.borderThickness * this.cellsCountX + this.borderThickness;
  var h = this.cellsCountY * this.cellHeight + this.borderThickness * this.cellsCountY + this.borderThickness;
  this.grid = new Phaser.Rectangle((Editor_Width - w) / 2, (Editor_Height - h) / 2, w, h);

  h = (Editor_Height - h) / 2;
  w = (Editor_Width - w) / 2;
  for (var y = 0; y < this.cellsCountY; y++) {
    for (var x = 0; x < this.cellsCountX; x++) {
      var posX = w + (this.borderThickness * (x + 1)) + (this.cellWidth * x);
      var posY = h + (this.borderThickness * (y + 1)) + (this.cellHeight * y);

      this.cell.push(new Cell(posX, posY, x.toString() + '-' + y.toString(), this.c2));
    }
  }
};

//$   GET CELL FUNCTION    $
///   return a pointer to the cell
Grid.prototype.getCell = function(_id) {
  for (var i = 0; i < this.cell.length; i++) {
    if (this.cell[i].HashId == _id) {
      return i;
    }
  }
};

//$   GRID RENDER FUNCTION    $
Grid.prototype.render = function() {
  game.debug.geom(this.grid, this.c);

  for (var i = 0; i < this.cell.length; i++) {
    this.cell[i].render();
  }
};

//$   CELL GET ROW FUNCTION    $
Grid.prototype.getRow = function(_currentPos) {
  var _y = this.cellsCountX;
  for (var x = 0; x < this.cellsCountX; x++) {
    if (_currentPos < _y) {
      return x;
    }
    _y += this.cellsCountX;
  }
};

//$   CELL GET COLUMN FUNCTION    $
Grid.prototype.getColumn = function(_currentPos) {
  for (var x = 0; x < this.cellsCountX; x++)
    for (var y = 0; y < this.cellsCountX; y++)
      if (_currentPos === (y + x * this.cellsCountX))
        return y;
};
