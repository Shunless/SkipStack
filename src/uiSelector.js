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

function breakToFlipCard(topleft, bottomright, classname) {
    var hasha = hashId();
    var hashb = hashId();
    var hash = hashId();
    var top = ((Number(topleft.split('-')[0]) - 1) * cellSize);
    var left = ((Number(topleft.split('-')[1]) - 1) * cellSize);

    var gridarea = roundUp(topleft, bottomright, hasha);
    gridarea.addClass('front');
    gridarea.addClass(classname);
    gridarea.addClass(hash);

    gridarea.children('.cell').each(function() {
        $(this).css('top', (Number($(this).css('top').split('px')[0]) - top) + 'px');
        $(this).css('left', (Number($(this).css('left').split('px')[0]) - left) + 'px');
    });

    var newdiv = createArea(topleft, bottomright, hashb);
    var width = newdiv.css('width');
    var height = newdiv.css('height');

    newdiv.css('top', '0');
    newdiv.css('left', '0');

    newdiv.addClass('back');
    newdiv.addClass(classname);
    newdiv.addClass(hash);

    gridarea.css({
        'top': top,
        'left': left,
        'width': width,
        'height': height
    });

    $('.' + hash).wrapAll('<div style="position: fixed; top: ' + top + 'px; left: ' + left + 'px; width: ' + width + '; height: ' + height + ';" class="flipcard ' + classname + '"/>');
    $('.' + classname + ' > *').removeClass(hasha);
    $('.' + classname + ' > *').removeClass(hashb);
    $('.' + classname + ' > *').removeClass(hash);

    return $('.flipcard.' + classname);
}

function hashId() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}