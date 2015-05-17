var wwidth = $(window).width();
var wheight = $(window).height();
var cellSize;
var hashCache = [];

$(document).ready(function() {
    compareSize();
    prepCell();
    addPlayButton();
    $('#PlayBtn').click(function() {
        prepRepurpose('4-1', '10-1', '');
		$('#gameobj').flip(true);
    })
});

function prepCell() {
    var border = Math.floor(wheight * 0.00781634663 / 2);
    $('.cell').css('border', border + 'px solid #bbb');
    $('.gamecont').css('border', border + 'px solid #bbb');
    $('.gamecont').css('width', cellSize * 7);
    $('.gamecont').css('height', cellSize * 13);
};

function setCellSize(width) {
    $('.cell').css('width', width);
    $('.cell').css('height', width);
}

function compareSize() {
    var neww = Math.floor(wwidth / 7);
    var newh = Math.floor(wheight / 13);
    var size;
    if (neww > newh) {
        size = newh;
    } else {
        size = neww;
    }
    cellSize = size - 1;
    setCellSize(cellSize);
}

/*******************************/
/****** UI Grid selectors ******/
/*******************************/

/* Cell Coordinates are represented as x-y, with x representing the herizontal location and y the vertical */

function selectCell(cellCoords) {
    var x = cellCoords.split('-')[0];
    var y = cellCoords.split('-')[1];
    return $('.row:nth-child(' + x + ') .cell:nth-child(' + y + ')')
}

function selectRow(cellCoords) {
    var x = cellCoords.split('-')[0];
    var y = cellCoords.split('-')[1];
    return $('.row:nth-child(' + x + ')')
}

function multipleCellSelector(cella, cellb) {
    var s = $('');
    var sum = Number(cellb.split('-')[1] - cella.split('-')[1]);
    for (var i = 0; i < sum + 1; i++) {
        s = s.add(selectCell(cella));
        cella = cella.split('-')[0] + '-' + (Number(cella.split('-')[1]) + 1);
    }
    return s
}

function multipleRowSelector(cella, cellb) {
    var s = $('');
    var sum = Number(cellb.split('-')[0] - cella.split('-')[0]);
    for (var i = 0; i < sum + 1; i++) {
        s = s.add(selectRow(cella));
        cella = (Number(cella.split('-')[0]) + 1) + '-' + cella.split('-')[1];
    }
    return s
}

function cellRoundUp(cella, cellb, className) {
    var hash = randomString(5, 'abcdefghikhlmnopqrstuvwxyz');
    multipleCellSelector(cella, cellb).wrapAll('<div id="' + hash + '" class="' + className + '" />');
    return hash
}

function rowRoundUp(cella, cellb, className) {
    var hash = randomString(5, 'abcdefghikhlmnopqrstuvwxyz');
    multipleRowSelector(cella, cellb).wrapAll('<div id="' + hash + '" class="' + className + '" />');
    cacheHash(className, hash);
    return hash
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

/* Add the back to the newly created roundUps
WIll use .append() and change roundup so it gets a unique hash id for each .new div*/

function prepRepurpose(cella, cellb, className) {
    var hash;
    if (Number(cella.split('-')[0]) != Number(cella.split('-')[0])) {
        hash = cellRoundUp(cella, cellb, className);
    } else {
        hash = rowRoundUp(cella, cellb, className);
    }
    var reptag = $('#' + hash);
    reptag.addClass('front');
    var gameobj = createGameObject().addClass('back');
    $(reptag.add(gameobj)).wrapAll('<div id="gameobj" style="height:' + cellSize * 7 + ';"/>')
    $("#gameobj").flip({
        trigger: 'manual'
    });
    return reptag
}

function createGameObject() {
    return $('<div id="SkipStack" style="position:relative;top:0;width:' + cellSize * 7 + ';height:' + cellSize * 7 + '" >GameGoesHere</div>')
}

function playButton() {
    return $('<i id="PlayBtn" class="center fa fa-play fa-2x" />')
}

function addPlayButton() {
    var midCell = selectCell('7-4');
    var playBtn = playButton();
    midCell.append(playBtn)
}

function cacheHash(className, hash) {
    hashCache[className] = hash;
}