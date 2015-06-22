/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */

var cellSize; //Global cell diametre variable
var border; //Global border width variable
var uniz = 0; //Global Z-Index, functions ssould call the zIndex function and not the variable itself
var gamemode = ['Normal', 'Endless', 'SkipSmash', 'PaintStack']; //Contains all game modes and can be dynamically altered
var disp; //Temporary variable ment for setter-getter relationships


//========================\\
//  Create the game grid  \\
//========================\\

function gridBuilder(tl, br) {
	//Creates basic game grid - arguements are top left (tl), bottom right (br) cell coordinates

	var cellection = $(''); //Will contain the game grid by return

	var x = getCoords(tl)[0] - 1, //Defines the first vertical cell - reduced by one to account for index change (from 1 to 0)
		y = getCoords(tl)[1] - 1, //Defines the first horizontal cell
		a = getCoords(br)[0], //Defines the last vertical cell
		b = getCoords(br)[1]; //Defines the last horizontal cell

	for (; x < a; x++) { //Runs row creation function for every column
		cellection = rowCreator(x, y, b, cellection); //Returns (cellection) with a new unique row until the full grid is formed
	}

	return cellection; //Returns full grid
}

function rowCreator(x, y, b, cellection) {
	//Creates a single row - arguements are vertical coordinate (x), vertical coordinate (y), last vertical coordinate (b), jQuery object to append the row (cellection)

	var newcell, //Will contain the jQuery object of a single cell with all of its attributes
		horloc, //Will contain the 'left' css attribute of a single cell
		verloc, //Will contain the 'top' css attribute of a single cell
		domCont = $('.gamecont'); //Contains a jQuery object of the DOM's element '.gamecont'

	for (; y < b; y++) { //Creates the jQuery object of  a single row cell by cell
		verloc = cellSize * x; //Calculates (horloc) based on the global cell diametre variable
		horloc = cellSize * y; //Calculates (verloc) based on the global cell diametre variable

		newcell = $('<div class="cell" id="' + Number(x + 1) + '-' + Number(y + 1) + '" />'); //Creates the jQuery object of a new cell and gives it unique coordinates as id
		newcell.css({
			'left': horloc, //Adds the 'left' css attribute
			'top': verloc //Adds the 'top' css attribute
		});

		domCont.append(newcell); //Appends each cell to the DOM

		cellection = cellection.add('#' + Number(x + 1) + '-' + Number(y + 1)) //Creates a jQuery object pointing to the new cell in the dom and adds it to (cellection)
	}

	return cellection; //Returns (cellection) with a new unique row
}

function prepCell() { //Adds global css attributes to each cell

	$('.cell').css({
		'border': border + 'px solid #bbb',
		'width': cellSize,
		'height': cellSize
	});
}

function compareSize() {
	//Calculates the tile size

	var window_height = $(window).height(),
		window_width = $(window).height(),
		new_width = Math.floor(window_width / 7),
		new_height = Math.floor(window_height / 13),
		size;

	if (new_width > new_height) {
		size = new_height;
		border = Math.floor(window_height * 0.00781634663 / 2);
	} else {
		size = new_width;
		border = Math.floor(window_width * 0.00781634663 / 2);
	}

	cellSize = size - 1;
}

function genBar(classname) {
	var bar = $('<div />');
	var barbg = $('<div />')
	var barfg = $('<div />');
	barfg.css({
		'width': '100%',
		'position': 'absolute',
		'height': cellSize / 4,
		'bottom': 0 - (cellSize / 4),
		'left': '0',
		'z-index': 129,
		'border-left': 2 * border + 'px solid rgb(51, 51, 51)',
		'border-right': 2 * border + 'px solid rgb(51, 51, 51)',
		'border-bottom': 2 * border + 'px solid rgb(51, 51, 51)',
		'box-sizing': 'border-box'
	});

	barbg.css({
		'background-color': 'rgb(255, 255, 255)',
		'width': '100%',
		'position': 'absolute',
		'height': cellSize / 4,
		'bottom': 0 - (cellSize / 4),
		'left': '0',
		'z-index': 127,

	});

	bar.addClass('bar');
	bar.css({
		'background-color': 'rgb(0, 128, 0)',
		'width': '100%',
		'position': 'absolute',
		'height': cellSize / 4,
		'bottom': 0 - (cellSize / 4),
		'left': '0',
		'z-index': 128,

	});
	bar.appendTo($(classname));
	barbg.appendTo($(classname));
	barfg.appendTo($(classname));
}


//========================\\
//   Modify existing ui   \\
//========================\\


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

function createBlock() {
	var a = $('<div />');
	var width = Math.floor(cellSize * 2.5);

	a.css({
		'background-color': '#ffffff',
		'border': border * 2 + 'px solid #000000',
		'width': width + 'px',
		'height': width + 'px',
		'z-index': zIndex() * 10,
		'-webkit-box-shadow': '0px 0px 25px 3px rgba(0,0,0,0.51)',
		'-moz-box-shadow': '0px 0px 25px 3px rgba(0,0,0,0.51)',
		'box-shadow': '0px 0px 25px 3px rgba(0,0,0,0.51)'
	});

	var hash = hashId();
	a.addClass(hash + ' center');
	a.appendTo('body');

	return {
		'block': a,
		'hash': hash
	};
}


//========================\\
//    Create in-game ui   \\
//========================\\

function uiCell(size, l, cont, fluff) {
	this.size = size;
	this.left = l;
	this.content = cont;
	this.text = fluff;

	this.generate = function () {
		this.tl = getCoords(this.left);
		this.br = [this.tl[0], (this.tl[1] + this.size)];
		this.class = 'cls_' + this.text;
		this.flipcard = gridToFlipCard(this.tl[0] + '-' + this.tl[1], this.br[0] + '-' + this.br[1], this.class);

		this.area = this.flipcard.children('.back');
		this.area.css({
			'background-color': '#ffffff',
			'border': border + 'px solid #000000',
			'box-sizing': 'border-box'
		});
		injectText(this.text, this.area);

		this.flip = function () {
			flip(this.flipcard);
		};
	};
}


function vibCreate(cls, opt, tmt) {
	this.obj = $('.' + cls);

	this.obj.jrumble(opt);
	this.vibStart = function () {
		this.obj.trigger('startRumble');
	};
	this.vibStop = function () {
		this.obj.trigger('stopRumble');
	};

	if (tmt) {
		this.shVib = function () {
			console.log(this);
			setTimeout(this.vibStop, tmt);
		}
	};
}
