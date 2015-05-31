/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

var onDownPosX, onDownPosY, onEndPosX, onEndPosY;

function mouseDragStart() {
  if (game.input.activePointer.withinGame === false)
    return null;

  onDownPosX = game.input.x;
  onDownPosY = game.input.y;
}

function mouseDragMove() {

}

function mouseDragEnd() {
  if (game.input.activePointer.withinGame === false)
    return null;

  onEndPosX = game.input.x;
  onEndPosY = game.input.y;

  var diffX = onDownPosX - onEndPosX;
  var diffY = onDownPosY - onEndPosY;

  var isSwipeX = (Math.abs(diffX) > Editor_Width / 4);
  var isSwipeY = (Math.abs(diffY) > Editor_Width / 4);

  if (isSwipeX == true || isSwipeY == true) {

    if (isSwipeY == true) {
      if (Math.abs(diffY) > Math.abs(diffX)) {
        if (diffY > 0) {
          actor.move('top');

          //alert('Detected: Top Swipe');
        } else {
          //actor.move(false,true,false,false);
          actor.move('bottom');

          //alert('Detected: Bottom Swipe');
        }
      } else {
        if (diffX > 0) {
          //actor.move(false,false,false,true);
          actor.move('left');

          //alert('Detected: Left Swipe');
        } else {
          //actor.move(false,false,true,false);
          actor.move('right');

          //alert('Detected: Right Swipe');
        }
      }
    } else {
      if (diffX > 0) {
        //actor.move(false,false,false,true);
        actor.move('left');

        //alert('Detected: Left Swipe');
      } else {
        //actor.move(false,false,true,false);
        actor.move('right');

        //alert('Detected: Right Swipe');
      }
    }
  }

  onDownPosX = onEndPosX = onDownPosY = onEndPosY = 0;
}