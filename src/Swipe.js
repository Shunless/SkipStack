var onDownPosX,onDownPosY
    onEndPosX,onEndPosY;

function mouseDragStart() {
    onDownPosX=game.input.mousePointer.x;
    onDownPosY=game.input.mousePointer.y;
}

function mouseDragMove() {

}

function mouseDragEnd() {
    onEndPosX=game.input.mousePointer.x;
    onEndPosY=game.input.mousePointer.y;

    var diffX = onDownPosX-onEndPosX;
    var diffY = onDownPosY-onEndPosY;

    var isSwipeX = Math.abs(diffX)>Editor_Width/3;
    var isSwipeY = Math.abs(diffY)>Editor_Width/3;

    if( isSwipeX == true || isSwipeY == true ){

        if(isSwipeY == true){
            if(Math.abs(diffY) > Math.abs(diffX)){
                if(diffY>0){
                    actor.move(true,false,false,false);

                    alert('Detected: Top Swipe');
                }
                else{
                    actor.move(false,true,false,false);

                    alert('Detected: Bottom Swipe');
                }
            }
            else{
                if(diffX>0){
                    actor.move(false,false,false,true);

                    alert('Detected: Left Swipe');
                }
                else{
                    actor.move(false,false,true,false);

                    alert('Detected: Right Swipe');
                }
            }
        }
        else{
            if(diffX>0){
                actor.move(false,false,false,true);

                alert('Detected: Left Swipe');
            }
            else{
                actor.move(false,false,true,false);

                alert('Detected: Right Swipe');
            }
        }
    }

    onDownPosX = onEndPosX = onDownPosY = onEndPosY = 0;
}
