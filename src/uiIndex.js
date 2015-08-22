/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */

$(document).ready(function () {
    compareSize();
    gridBuilder('1-1', '13-7');
    prepGame();
    // if not using the a minified version of the game.
    if($('#using_builder').length<=0){
        console.log('Loading Scripts');
        addScript('src/Math.js');
        addScript('src/Cell.js');
        addScript('src/Swipe.js');
        addScript('src/Actor.js');
        addScript('src/Enemy.js');
        addScript('src/Assets/Tunes.js');
        addScript('src/Assets/Shaders.js');
        addScript('src/Grid.js');
        addScript('src/Color.js');
        addScript('src/index.js');
        console.log('Loaded Scripts');
    }
    createModeSelector();
});

function prepGame() {
    //Visually prepares the game area
    prepCell('1-1', '13-7');
    $('.gamecont').css({
        'border': border + 'px solid #bbb',
        'width': cellSize * 7,
        'height': cellSize * 13
    });
}

function createGame(callback) {

    //Inject gamemode first value to GameType variable
    GameType = gamemode[0];

    if (gamemode[0] === 'PaintStack') {
        indicator = new uiCell(2, '2-1', 'enemies', 'en', function () {
            return Math.floor(actor.markedArea) + '%';
        });
    } else {
        indicator = new uiCell(2, '2-1', 'enemies', 'en', function () {
            return SkipStack.CurrentScore;
        });
    }


    //Make a flipcard div spanning 4-1 and 10-7 including areas
    var a = selectComplex('4-1', '10-7', 'SkipStack', ['.preview', '.prev', '.next', '.modeselector']);
    a.children('.back').attr('id', 'SkipStack');
    //Create game object
    game = new Phaser.Game(Editor_Width, Editor_Height, Phaser.AUTO, 'SkipStack', {
        preload: preload,
        create: create,
        update: update,
        maxWidth: 7 * cellSize,
        maxHeight: 7 * cellSize
    });

    var bar = genBar('#SkipStack');

    if (gamemode[0] === 'PaintStack') {
        indicator.refresh = function () {
            if (indicator.rendered) {
                this.text(Math.floor(actor.markedArea) + '%');
            };
        };
    }

    indicator.generate();

    flip(a.not('.SkipStack>*'));
    setTimeout(function () {
        FlipcardtoArea(a);
    }, 500);
    setTimeout(function () {
        indicator.flip();
    }, 300);

    if (callback !== undefined) {
        callback();
    }

    return a;
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
        //'height': '100%',
        'text-align': 'center',
        'font-size': 0.8 * cellSize + 'px',
        'position': 'fixed',

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
    var prev = gridToFlipCard('10-1', '10-1', 'prev');
    var next = gridToFlipCard('10-7', '10-7', 'next');

    prev.children('.back').css({
        'box-sizing': 'border-box',
        'background-color': '#ffffff',
        'border': border + 'px solid rgb(0, 0, 0)'
    }).click(function () {
        prevMode();
    });

    next.children('.back').css({
        'box-sizing': 'border-box',
        'background-color': '#ffffff',
        'border': border + 'px solid rgb(0, 0, 0)'
    }).click(function () {
        nextMode();
    });

    var selector = gridToFlipCard('10-2', '10-6', 'modeselector');

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

    setTimeout(function () {
        prev = flip(prev);
    }, 100);
    setTimeout(function () {
        preview = flip(preview);
    }, 200);
    setTimeout(function () {
        next = flip(next);
    }, 100);
    selector = flip(selector);

    setTimeout(function () {
        //doubleSelector(selector)
        selector = FlipcardtoArea(selector, handleGameCreate);
        preview = FlipcardtoArea(preview, handlePreview);
        next = FlipcardtoArea(next);
        prev = FlipcardtoArea(prev);
    }, 1000);

}

function handlePreview() {
    disp = doubleAreaFlipcard(disp, 'preview');
    injectText('disp', disp.children('.back'));
}

function handleGameCreate() {
    disp = doubleAreaFlipcard(disp, 'modeselector');
    injectText('disp', disp.children('.back'));
    disp.click(function () {
        createGame();
    });
}

function flipSelector(obj, newtext, rot) {
    if (obj.data('face') == 'front') {
        obj.data('face', 'back');
        obj.children('.back > div').text(newtext);
    } else {
        obj.data('face', 'front');
        obj.children('.front > div').text(newtext);
    }
    flip(obj.not('.flipcard > *'), rot);
}

function nextMode() {
    arrayRotate(gamemode, true);
    setTimeout(function () {
        flipSelector($('.preview'), ('[' + gamemode[0] + ' preview]'));

    }, 50);
    flipSelector($('.modeselector'), gamemode[0]);
}

function prevMode() {
    arrayRotate(gamemode);
    setTimeout(function () {
        flipSelector($('.preview'), ('[' + gamemode[0] + ' preview]'), true);
    }, 50);
    flipSelector($('.modeselector'), gamemode[0], true);

}

//========================\\
//       In-game ui       \\
//========================\\

var indicator;
