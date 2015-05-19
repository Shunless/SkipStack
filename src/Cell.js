/**
 * @author Alex Mourtziapis
 */

function Cell(_posX,_posY,_name,_color){
  this.color =  _color;
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
}

Cell.prototype.init = function(){
    this.rect = new Phaser.Rectangle(this.positionX, this.positionY, grid.cellWidth,  grid.cellWidth);
};

/*  SET CELL TYPE   */
Cell.prototype.setCellType = function(_type){
  if(_type!='Normal'&&_type!='Enemy'&&_type!='Actor')
    alert('type can only be "Enemy","Normal","Actor"');
  this.type = _type;
};

/*   CELL RENDER FUNCTION   */
Cell.prototype.render = function(){
  game.debug.geom(this.rect,this.color);
};

/*   SET CELL COLOR   */
Cell.prototype.setColor = function(_clr){
  this.color =  _clr;
};

/*   CHECK CELL  */
Cell.prototype.checkCell = function(_direction,_currentPos){
  var result = true;

  switch(_direction){
    case 'top':
      if(_currentPos<cellsCntX||grid.cell[_currentPos - cellsCntX].type === 'Enemy'){
        result = false;
      }
      else{
        result = true;
      }
      //grid.cell[_currentPos - cellsCntX]

      break;
    case 'bottom':
      //if > CellsCountX*CellsCountY-CellsCountX
      if(_currentPos>(cellsCntX*grid.cellsCountY)-cellsCntX
        ||grid.cell[_currentPos + cellsCntX].type === 'Enemy'){
        result = false;
      }
      else{
        result = true;
      }
      //grid.cell[_currentPos + cellsCntX]

      break;
    case 'left':
      if(grid.cell[_currentPos - 1].type === 'Enemy'){
        result = false;
        break;
      }

      for(var i=0;i<cellsCntX;i++){
        if(_currentPos === cellsCntX*i){
            result = false;
        }
      }
      if(result==false)
        break;
      else
        result = true;

      //grid.cell[_currentPos-1]

      break;
    case 'right':
      if(grid.cell[_currentPos + 1].type === 'Enemy'){
        result = false;
        break;
      }

      for(var i=0;i<cellsCntX;i++){
        if(_currentPos === (cellsCntX*i-1)){
            result = false;
        }
      }
      if(result==false)
        break;
      else
        result = true;

      //grid.cell[_currentPos+1]

      break;
    default:
      break;
  }

  return result;
};
