/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */
$(document).ready(function () {
    compareSize();
    gridBuilder('1-1', '13-7');
    prepGame();
    createPlayButton();
    addScript('src/Math.js');
    addScript('src/Cell.js');
    addScript('src/Swipe.js');
    addScript('src/Actor.js');
    addScript('src/Enemy.js');
    addScript('src/Assets/Tunes.js');
    addScript('src/Grid.js');
    addScript('src/Color.js');
    addScript('src/index.js');
});

function createGame() {
    var a = gridToFlipCard('4-1', '10-7', 'SkipStack');

    game = new Phaser.Game(Editor_Width, Editor_Height, Phaser.CANVAS, 'SkipStack', {
        preload: preload,
        create: create,
        update: update,
        render: render,
        maxWidth: 7 * cellSize,
        maxHeight: 7 * cellSize
    });


    a.children('.back').attr('id', 'SkipStack');
    a = flip(a);
    setTimeout(function () {
        FlipcardtoArea(a);
    }, 1000);
}

function createPlayButton() {
    createButton('7-4', 'play').click(function () {
        createGame();
    });
}

function createTextCont(span, text) {
    var div = $('<div />');
    div.css({
        'width': (span * cellSize) + 'px',
        'height': '100%',
        'text-align': 'center',
        'font-size': '3em',
        'position': 'fixed'
    });
    div.text(text);
    return div;
}

function injectText(text, container) {
    var tl;
    var br;
    if (container.hasClass('back')) {
        tl = container.parent().data('tl');
        br = container.parent().data('br');
    } else {
        tl = container.data('tl');
        br = container.data('br');
    }
    var span = Number(br.split('-')[1]) - Number(tl.split('-')[1]) + 1;
    var div = createTextCont(span, text);
    div.appendTo(container);
    return container;
}
