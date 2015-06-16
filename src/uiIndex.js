/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */
$(document).ready(function() {
    compareSize();
    gridBuilder('1-1', '13-7');
    prepGame();
    addScript('src/Math.js');
    addScript('src/Cell.js');
    addScript('src/Swipe.js');
    addScript('src/Actor.js');
    addScript('src/Enemy.js');
    addScript('src/Assets/Tunes.js');
    addScript('src/Grid.js');
    addScript('src/Color.js');
    addScript('src/index.js');
    createModeSelector()
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
    genBar('#SkipStack');
    a = flip(a);
    setTimeout(function() {
        5
        FlipcardtoArea(a);
    }, 1000);
}

function createPlayButton() {
    createButton('7-4', 'play').click(function() {
        createGame();
    });
}

function createTextCont(span, text) {
    var div = $('<div />');
    div.css({
        'width': (span * cellSize) + 'px',
        //'height': '100%',
        'text-align': 'center',
        'font-size': 0.8 * cellSize + 'px',
        'position': 'fixed',
        'position': 'relative',
        'top': '50%',
        'transform': 'translateY(-50%)'
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

function createModeSelector() {
    var prev = gridToFlipCard('10-1', '10-1', 'prev')
    var next = gridToFlipCard('10-7', '10-7', 'next')

    prev.children('.back').css({
        'box-sizing': 'border-box',
        'background-color': '#ffffff',
        'border': border + 'px solid rgb(0, 0, 0)'
    }).click(function() {
        prevMode()
    });

    next.children('.back').css({
        'box-sizing': 'border-box',
        'background-color': '#ffffff',
        'border': border + 'px solid rgb(0, 0, 0)'
    }).click(function() {
        nextMode();
    });

    //createButton('10-1', 'prev');
    //createButton('10-7', 'next');
    var selector = gridToFlipCard('10-2', '10-6', 'modeselector').click(function() {
        createGame();
    });
    var preview = gridToFlipCard('4-2', '7-6', 'preview');

    selector.children('.back').css({
        'box-sizing': 'border-box',
        'background-color': '#ffffff',
        'border': border + 'px solid rgb(0, 0, 0)'
    });

    injectText('Normal', selector.children('.back'));

    preview.children('.back').css({
        'box-sizing': 'border-box',
        'background-color': '#ffffff',
        'border': border + 'px solid rgb(0, 0, 0)'
    });

    injectText('[Normal preview]', preview.children('.back'));

    setTimeout(function() {
        prev = flip(prev);
    }, 100);
    setTimeout(function() {
        preview = flip(preview);
    }, 200);
    setTimeout(function() {
        next = flip(next);
    }, 100);
    selector = flip(selector);


    setTimeout(function() {
        //FlipcardtoArea(selector);
        FlipcardtoArea(preview);
        FlipcardtoArea(next);
        FlipcardtoArea(prev);
    }, 1000);

}


function modeIndicator(container) {
    disposable = container;
    gamemode.forEach(createDiv);
}

function createDiv(Element) {

}


function nextMode() {
    arrayRotate(gamemode, true);
    console.log(gamemode);
    $('.back.modeselector > div').text(gamemode[0]);
    $('.preview > div').text('[' + gamemode[0] + ' preview]');
}

function prevMode() {
    arrayRotate(gamemode);
    console.log(gamemode);
    $('.back.modeselector > div').text(gamemode[0]);
    $('.preview > div').text('[' + gamemode[0] + ' preview]');
}
