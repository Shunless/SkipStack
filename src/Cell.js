function Cell(_posX,_posY,_cW,_cH,_name){
  this.positionX = _posX;
  this.positionY = _posY;
  this.width = _cW;
  this.height = _cH;

  this.rect;

  this.init();
}

Cell.prototype.init = function(){
    this.rect = new Phaser.Rectangle(this.positionX, this.positionY, this.width,  this.height);
};
