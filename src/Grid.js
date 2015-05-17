/**
 * @author Alex Mourtziapis
 */

function Grid(cellCntX, cellCntY, cellW, cellH, _color1,_color2){
    this.c = _color1;
    this.c2 = _color2;

    this.cellsCountX = cellCntX;//cells in x dimension .
    this.cellsCountY = cellCntY;//cells in y dimension .

    this.cellWidth = cellW;//width of every cell in px .
    this.cellHeight = cellH;//height of every cell in px .

    this.grid;

    //the cells of the grid
    this.cell = new Array();
}

Grid.prototype.init = function(){
  var w = this.cellsCountX * this.cellWidth  + 2 * this.cellsCountX + 2;
  var h = this.cellsCountY * this.cellHeight + 2 * this.cellsCountY + 2;
  this.grid = new Phaser.Rectangle((Editor_Width-w)/2, (Editor_Height-h)/2, w, h);

  h = (Editor_Height-h)/2;
  w = (Editor_Width-w)/2;
  for(var y=0;y<this.cellsCountY;y++){
    for(var x=0;x<this.cellsCountX;x++){
      var posX = w + (2 * (x + 1)) + (this.cellWidth * x);
      var posY = h + (2 * (y + 1)) + (this.cellHeight * y);

      this.cell.push(new Cell(posX, posY,x.toString() + '-' + y.toString(), this.c2) );
    }
  }
};

//$   GET CELL FUNCTION    $
///   return a pointer to the cell
Grid.prototype.getCell = function(_id){
    for(var i=0;i<this.cell.length;i++){
        if(this.cell[i].HashId == _id){
          return i;
        }
    }
};

//$   GRID RENDER FUNCTION    $
Grid.prototype.render = function(){
    game.debug.geom(this.grid,this.c);

    for(var i=0;i<this.cell.length;i++){
        this.cell[i].render();
    }
};
