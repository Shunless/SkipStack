var wwidth = $(window).width();
var wheight = $(window).height();
var cellSize;

$(document).ready(function() {
    compareSize();
    prepCell();

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
    cellSize = size;
    setCellSize(size);
}

/*******************************/
/****** UI Grid selectors ******/
/*******************************/

/* Cell Coordinates are represented as x-y, with x representing the herizontal location and y the vertical */

function selectCell(cellCoords) {
    var x = cellCoords.split('-')[0]
    var y = cellCoords.split('-')[1]
    return $('.row:nth-child(' + x + ') .cell:nth-child(' + y + ')')
}

function multipleCellSelector(cella, cellb) {
	var s = $('');
	while (cella != cellb){
		s = s.add(selectCell(cella))
		cella = cella.split('-')[0]+'-'+(Number(cella.split('-')[1])+1);
	}
	return s
}

function roundUp(cella, cellb) {
	multipleCellSelector(cella, cellb).wrapAll('<div class="new" />')
}

/* Add the back to the newly created roundUps
WIll use .append() and change roundup so it gets a unique hash id for each .new div*/