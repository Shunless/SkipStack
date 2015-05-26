$(document).ready(function() {
    compareSize();
    gridBuilder('1-1', '13-7');
    prepGame();
    createPlayButton();
});

function createGame() {

    var a = flip(gridToFlipCard('4-1', '10-7', 'SkipStack'));
	a.children('.back').attr('id','SkipStack')
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

function createPlayButton() {
    var playicon = $('<i class="fa fa-play center" /i>');
    playicon.css('font-size', border + 'em');
    $('#7-4').css('border-color', '#000').append(playicon).click(function() {
        createGame();
    });

    return $('#7-4');
}
