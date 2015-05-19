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
    var hash = hashId();
    var gridarea = roundUp(topleft, bottomright, hash);
	gridarea.addClass('front');
	gridarea.addClass(classname);
	//hash breaks entire logic-considers both items as selected and adds .back to both

    var newdiv = createArea(topleft, bottomright, hash);
    var top = newdiv.css('top');
    var left = newdiv.css('left');
    var width = newdiv.css('width');
    var height = newdiv.css('height');
    newdiv.addClass('back');
    newdiv.addClass(classname);

    gridarea.css({
        'top': top,
        'left': left,
        'width': width,
        'height': height
    });

    $('.' + hash).wrapAll('<div style="position:fixed; top:' + top + '; left:' + left + ';width:' + width + ';height:' + height + ';" class="flipcard ' + classname + '"/>');
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

/*EVERYTHING BELLOW THIS LINE IS ABSOLUTELY USELESS*/
/*
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
WIll use .append() and change roundup so it gets a unique hash id for each .new div

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
    $(reptag.add(gameobj)).wrapAll('<div id="gameobj" style="height:378px;"/>')
    $("#gameobj").flip();
    return reptag
}

function createGameObject() {
    return $('<canvas style="position:relative;top:0;width:' + cellSize * 7 + ';height:' + cellSize * 7 + '" />')
}

function cacheHash(className, hash) {
    hashCache[className] = hash;
}*/