/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */

/*******************************/
/****** UI Grid selectors ******/
/*******************************/

/* Cell Coordinates are represented as x-y, with x representing the herizontal location and y the vertical */

function selectCell(cellCoords) {
	//Returns jQuery object of a single cell
	//Inputs the coordinates of a single cell
	var x = cellCoords.split('-')[0];
	var y = cellCoords.split('-')[1];
	return $('#' + x + '-' + y);
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

function flip(jqtoflip, back, callback) {
	//Animates the flip of a Flipcard
	jqtoflip.css('z-index', zIndex());

	if (jqtoflip.data('rotation') === undefined) {
		jqtoflip.data('rotation', 0);
	}

	var rotations = jqtoflip.data('rotation');
	var rotDegrees;

	if (back) {
		rotDegrees = (180 * Number(rotations) - 180);
		rotations--;
	} else {
		rotDegrees = (180 * Number(rotations) + 180);
		rotations++;
	}

	jqtoflip.transition({
		perspective: '800px',
		rotateY: rotDegrees + 'deg'
	});

	jqtoflip.data('rotation', rotations);

	if (callback !== undefined) {
		callback(jqtoflip, callback);
	}

	return jqtoflip;

}

function hashId() {
	//Creates a 5-character random hash
	var text = "";
	var possible = "abcdefghijklmnopqrstuvwxyz";

	for (var i = 0; i < 5; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

function redGrid(grid, top, left) {
	//Centers grid cells contained in an object by the locations set in top and left
	grid.children('.cell').each(function () {
		$(this).css('top', (Number($(this).css('top').split('px')[0]) - top) + 'px');
		$(this).css('left', (Number($(this).css('left').split('px')[0]) - left) + 'px');
	});

	return grid;
}

function deGrid(grid, top, left) {
	//Centers grid cells contained in gamecont by the locations set in top and left
	grid.children('.cell').each(function () {
		$(this).css('top', (Number($(this).css('top').split('px')[0]) + top) + 'px');
		$(this).css('left', (Number($(this).css('left').split('px')[0]) + left) + 'px');
	});

	return grid;
}

function redArea(area, top, left) {
	area.css({
		'top': (Number($(area).css('top').split('px')[0]) - top) + 'px',
		'left': (Number($(area).css('left').split('px')[0]) - left) + 'px'
	});

	return area;
}


function selectComplex(topleft, bottomright, newclassname, areas) {
	var a = gridToFlipCard(topleft, bottomright, newclassname);
	var b = $(a.children('.front'));
	var tl = getCoords(topleft);

	areas.forEach(function (value) {
		redArea($(value), Number(tl[0] - 1) * cellSize, Number(tl[1] - 1) * cellSize);
		b = b.append($(value));
	});
	b.appendTo($('.' + newclassname + '.front'));
	return a;
}
