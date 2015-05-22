function createGame() {

    var a = flip(gridToFlipCard('4-1', '10-7', 'SkipStack'));
    setTimeout(function() {
        removeFlipcard(a);
    }, 1000);
    addScript('src/Math.js');
    addScript('src/Cell.js');
    addScript('src/Swipe.js');
    addScript('src/Actor.js');
    addScript('src/Enemy.js');
    addScript('src/Grid.js');
    addScript('src/Color.js');
    addScript('src/index.js');
}