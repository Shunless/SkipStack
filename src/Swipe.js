/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

var onDownPosX, onDownPosY, onEndPosX, onEndPosY;

function mouseDragStart() {
  if (!game.input.activePointer.withinGame){ clearvalues(); return; }

  onDownPosX = game.input.x;
  onDownPosY = game.input.y;
}

function mouseDragEnd() {
  if (!game.input.activePointer.withinGame|onDownPosX===0|onDownPosY===0){ clearvalues(); return; }

  onEndPosX = game.input.x;
  onEndPosY = game.input.y;

  var diffX = onDownPosX - onEndPosX;
  var diffY = onDownPosY - onEndPosY;

  var isSwipeX = (Boolean)(Math.abs(diffX) > cellWidth);
  var isSwipeY = (Boolean)(Math.abs(diffY) > cellHeight);

  if (isSwipeX|isSwipeY) {

    if (isSwipeY == true) {
      if (Math.abs(diffY) > Math.abs(diffX)) {
        if (diffY > 0) {
          actor.move('top');
        } else {
          actor.move('bottom');
        }
      } else {
        if (diffX > 0) {
          actor.move('left');
        } else {
          actor.move('right');
        }
      }
    } else {
      if (diffX > 0) {
        actor.move('left');
      } else {
        actor.move('right');
      }
    }
  }
  clearvalues();
}

function clearvalues(){
  onDownPosX = onEndPosX = onDownPosY = onEndPosY = 0;
}
