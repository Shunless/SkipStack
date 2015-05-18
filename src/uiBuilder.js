var wwidth = $(window).width(); //Grabs the screen's width
var wheight = $(window).height(); //Grabs the screen's height
var cellSize; //Global cell size variable

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
    var border = Math.floor(wheight * 0.00781634663 / 2);
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