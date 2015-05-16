function Cell(_posX,_posY,_name){
  this.positionX = _posX;
  this.positionY = _posY;

  this.rect;

  this.init();
}

Cell.prototype.init = function(){
    this.rect = new Phaser.Rectangle(this.positionX, this.positionY, grid.cellWidth,  grid.cellWidth);
};
