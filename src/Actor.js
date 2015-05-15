function Actor(_color1){
    this.c=_color1;

    this.actor;
}

Actor.prototype.init = function(){
    var w = grid.cellsCountX * grid.cellWidth  + 2 * grid.cellsCountX + 2;
    var h = grid.cellsCountY * grid.cellHeight + 2 * grid.cellsCountY + 2;

    var p =  Math.round(grid.cellsCountX/2)-1;

    h = (Editor_Height-h)/2;
    w = (Editor_Width-w)/2;

    var posX = w + (2 * (p + 1)) + (grid.cellWidth * p);
    var posY = h + (2 * (p + 1)) + (grid.cellHeight * p);

    this.actor = new Phaser.Rectangle(posX, posY, grid.cellWidth, grid.cellHeight);
};

Actor.prototype.move = function(SwipeType){
    switch(SwipeType){

    }
};

Actor.prototype.render = function(){
    game.debug.geom(this.actor,this.c);
};
