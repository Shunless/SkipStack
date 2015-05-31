/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */

var wwidth = $(window).width(); //Grabs the screen's width
var wheight = $(window).height(); //Grabs the screen's height
var cellSize; //Global cell size variable
var border; //Global border width variable
var uniz = 0;

function gridBuilder(tl, br) {
    //Fills the game grid
    var cellection = $('');
    var x = Number(tl.split('-')[0]) - 1;
    var y = Number(tl.split('-')[1]) - 1;
    var a = Number(br.split('-')[0]);
    var b = Number(br.split('-')[1]);
    for (; x < a; x++) {
        cellection = rowCreator(x, y, b, cellection);
    }
    return cellection;
}

function rowCreator(x, y, b, cellection) {
    //Creates a single row
    var newcell;
    var verloc;
    var horloc;
    for (; y < b; y++) {
        horloc = cellSize * x;
        verloc = cellSize * y;
        newcell = $('<div class="cell" id="' + Number(x + 1) + '-' + Number(y + 1) + '" />');
        newcell.css('left', verloc);
        newcell.css('top', horloc);
        $('.gamecont').append(newcell);
        cellection = cellection.add('#' + Number(x + 1) + '-' + Number(y + 1))
    }
    return cellection;
}

function prepCell() {
    $('.cell').css('border', border + 'px solid #bbb');
    $('.cell').css('width', cellSize);
    $('.cell').css('height', cellSize);
}

function prepGame() {
    //Visually prepares the game area
    prepCell()
    $('.gamecont').css('border', border + 'px solid #bbb');
    $('.gamecont').css('width', cellSize * 7);
    $('.gamecont').css('height', cellSize * 13);
};

function compareSize() {
    //Calculates the tile size
    var neww = Math.floor(wwidth / 7);
    var newh = Math.floor(wheight / 13);
    var size;
    if (neww > newh) {
        size = newh;
    } else {
        size = neww;
    }
    cellSize = size - 1;
    border = Math.floor(wheight * 0.00781634663 / 2);
}

/*******************************/
/******* UI Modificators *******/
/*******************************/

function createArea(topleft, bottomright, classname) {
    //Returns a div that spans between the input cells
    var top = Number(topleft.split('-')[0]);
    var left = Number(topleft.split('-')[1]);
    var x = Number(bottomright.split('-')[1]) - left;
    var y = Number(bottomright.split('-')[0]) - top;
    var div = $('<div />');

    div.css({
        'position': 'absolute',
        'width': ((x + 1) * cellSize),
        'height': ((y + 1) * cellSize),
        'top': ((top - 1) * cellSize),
        'left': ((left - 1) * cellSize)
    });

    $('.gamecont').append(div.addClass(classname));
    return $('.' + classname);
}

function createButton(loc, icon) {
    //Adds any FontAwsome character in a selected cell
    var playicon = $('<div class="' + icon + '"></div>');
    $('#' + loc).css('border-color', '#000').append(playicon)

    return $('#' + loc);
}

function reGrid(classname) {
    //Returns the canonical grid the area spans
    var area = $('.' + classname);
    var tl = area.data('tl');
    var br = area.data('br');
    var hash = hashId();
    var newgrid = gridBuilder(tl, br);

    var top = Number(tl.split('-')[0]);
    var left = Number(tl.split('-')[1]);
    var bottom = Number(br.split('-')[0]);
    var right = Number(br.split('-')[1]);

    //Create wrapper div
    var wrap = $('<div />');
    wrap.addClass(hash);
    wrap.css('width', (right - left + 1) * cellSize) + 'px';
    wrap.css('height', (bottom - top + 1) * cellSize) + 'px';

    //Conjoin
    var wrapper = newgrid.wrapAll(wrap);

    wrapper.css({
        'border': border + 'px solid #bbb',
        'width': cellSize,
        'height': cellSize
    });

    return {
        'wrap': $('.' + hash),
        'wraphash': hash
    };
}