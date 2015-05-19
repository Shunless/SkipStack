var wwidth = $(window).width(); //Grabs the screen's width
var wheight = $(window).height(); //Grabs the screen's height
var cellSize; //Global cell size variable
var border; //Global border width variable

$(document).ready(function() {
    compareSize();
    gridBuilder();
    prepCell();
    setCellSize(cellSize);
});

function gridBuilder() {
    //Fills the game grid
    var newcell;
    var x = 0;
    for (; x < 13; x++) {
        rowCreator(x);
    }
}

function rowCreator(x) {
    //Creates a single row
    var y = 0;
    var verloc;
    var horloc;
    for (; y < 7; y++) {
        horloc = cellSize * x;
        verloc = cellSize * y;
        newcell = $('<div class="cell" id="' + Number(x + 1) + '-' + Number(y + 1) + '" />');
        newcell.css('left', verloc);
        newcell.css('top', horloc);
        $('.gamecont').append(newcell);
    }
}

function prepCell() {
    //Visually prepares the game area
    border = Math.floor(wheight * 0.00781634663 / 2);
    $('.cell').css('border', border + 'px solid #bbb');
    $('.gamecont').css('border', border + 'px solid #bbb');
    $('.gamecont').css('width', cellSize * 7);
    $('.gamecont').css('height', cellSize * 13);
};

function setCellSize(width) {
    //Gives cells their canonical size
    $('.cell').css('width', width);
    $('.cell').css('height', width);
}

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
}

/*******************************/
/**** UI Primitive Creators ****/
/*******************************/

function createArea(topleft, bottomright, classname) {
    //Returns a div that spans between the input cells
    var top = Number(topleft.split('-')[0]);
    var left = Number(topleft.split('-')[1]);
    var x = Number(bottomright.split('-')[1]) - left;
    var y = Number(bottomright.split('-')[0]) - top;
    var div = $('<div />');
    div.css({
        'position': 'fixed',
        'width': ((x + 1) * cellSize),
        'height': ((y + 1) * cellSize),
        'top': ((top - 1) * cellSize),
        'left': ((left - 1) * cellSize)
    });
    $('.gamecont').append(div.addClass(classname));
    return $('.' + classname);
}