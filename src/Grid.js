function Grid(cellCntX, cellCntY, cellW, cellH, _color){
    this.c=_color;


    this.cellsCountX = cellCntX;//cells in x dimension .
    this.cellsCountY = cellCntY;//cells in y dimension .

    this.cellWidth = cellW;//width of every cell in px .
    this.cellHeight = cellH;//height of every cell in px .

    this.grid;
}

Grid.prototype.init = function(){
    var w = this.cellsCountX * this.cellWidth;//The
    this.grid = new Phaser.Rectangle((Editor_Width-w)/2, (Editor_Height-w)/2, w, w);
};

Grid.prototype.render = function(){
    game.debug.geom(this.grid,this.c);
};
