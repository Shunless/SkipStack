/*******************************/
/****** UI Grid selectors ******/
/*******************************/

/* Cell Coordinates are represented as x-y, with x representing the herizontal location and y the vertical */

function selectCell(cellCoords) {
    //Returns jQuery object of a single cell
    //Inputs the coordinates of a single cell
    var x = cellCoords.split('-')[0];
    var y = cellCoords.split('-')[1];
    return $('#' + x + '-' + y)
}

function selectRow(x) {
    //Returns jQuery object of a single row
    //Inputs the coordinate of a single row
    var y = 1;
    var row = $('');
    for (; y <= 7; y++) {
        row = row.add(selectCell(x + '-' + y));
    }
    return row;
}

function selectCol(y) {
    //Returns jQuery object of a single column
    //Inputs the coordinate of a single column
    var x = 1;
    var col = $('');
    for (; x <= 13; x++) {
        col = col.add(selectCell(x + '-' + y));
    }
    return col;
}

function selectAreaComplimentary(tly, bry, tlx, area) {
    //Complements the selectArea() function
    for (; tly <= bry + 1; tly++) {
        area = area.add(selectCell(tlx + '-' + tly));
    }
    return area;
}

function selectArea(topleft, bottomright) {
    //Returns jQuery object of an area shape
    //Inputs top left and bottom right coordinates
    var area = $('');
    var tlx = Number(topleft.split('-')[0]);
    var tly = Number(topleft.split('-')[1]);
    var brx = Number(bottomright.split('-')[0]);
    var bry = Number(bottomright.split('-')[1]) - 1;
    for (; tlx <= brx; tlx++) {
        area = selectAreaComplimentary(tly, bry, tlx, area);
    }
    return area;
}

function roundUp(topleft, bottomright, classname) {
    selectArea(topleft, bottomright).wrapAll('<div class="' + classname + '"/>');
    return $('.' + classname);
}

function flip(jqtoflip) {
    jqtoflip.toggleClass('flipped');
}

function hashId() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}