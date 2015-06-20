// --- file[uiSelector.js] ---

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

function flip(jqtoflip, back) {
    //Animates the flip of a Flipcard
    jqtoflip.css('z-index', zIndex());

    if (jqtoflip.data('rotation') === undefined) {
        jqtoflip.data('rotation', 0);
    };

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

    jqtoflip.data('rotation', rotations)
    return jqtoflip

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
    grid.children('.cell').each(function() {
        $(this).css('top', (Number($(this).css('top').split('px')[0]) - top) + 'px');
        $(this).css('left', (Number($(this).css('left').split('px')[0]) - left) + 'px');
    });

    return grid;
}

function deGrid(grid, top, left) {
    //Centers grid cells contained in gamecont by the locations set in top and left
    grid.children('.cell').each(function() {
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

    areas.forEach(function(value) {
        redArea($(value), Number(tl[0]-1)*cellSize, Number(tl[1]-1)*cellSize);
        b = b.append($(value));
    });
    b.appendTo($('.' + newclassname + '.front'));
    return a;
}


// --- file[uiIndex.js] ---

/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */
$(document).ready(function() {
    compareSize();
    gridBuilder('1-1', '13-7');
    prepGame();
    createModeSelector()
});

function createGame() {

	//Inject gamemode first value to GameType variable
    GameType = gamemode[0];

	//Make a flipcard div spanning 4-1 and 10-7 including areas
    var a = selectComplex('4-1', '10-7', 'SkipStack', ['.preview', '.prev', '.next', '.flipcard.modeselector']);

	//Create game object
    game = new Phaser.Game(Editor_Width, Editor_Height, Phaser.CANVAS, 'SkipStack', {
        preload: preload,
        create: create,
        update: update,
        render: render,
        maxWidth: 7 * cellSize,
        maxHeight: 7 * cellSize
    });

    a.children('.back').attr('id', 'SkipStack');

    genBar('#SkipStack');
    flip(a.not('.SkipStack>*'));
    setTimeout(function() {
        5
        FlipcardtoArea(a);
    }, 1000);
}

function createPlayButton() {
    createButton('7-4', 'play').click(function() {
        createGame();
    });
}

function createTextCont(span, text) {
    var div = $('<div />');
    div.css({
        'width': (span * cellSize) + 'px',
        //'height': '100%',
        'text-align': 'center',
        'font-size': 0.8 * cellSize + 'px',
        'position': 'fixed',
        'position': 'relative',
        'top': '50%',
        'transform': 'translateY(-50%)'
    });
    div.text(text);
    return div;
}

function injectText(text, container) {
    var tl;
    var br;
    if (container.hasClass('back')) {
        tl = container.parent().data('tl');
        br = container.parent().data('br');
    } else {
        tl = container.data('tl');
        br = container.data('br');
    }
    var span = Number(br.split('-')[1]) - Number(tl.split('-')[1]) + 1;
    var div = createTextCont(span, text);
    div.appendTo(container);
    return container;
}

function createModeSelector() {
    var prev = gridToFlipCard('10-1', '10-1', 'prev')
    var next = gridToFlipCard('10-7', '10-7', 'next')

    prev.children('.back').css({
        'box-sizing': 'border-box',
        'background-color': '#ffffff',
        'border': border + 'px solid rgb(0, 0, 0)'
    }).click(function() {
        prevMode()
    });

    next.children('.back').css({
        'box-sizing': 'border-box',
        'background-color': '#ffffff',
        'border': border + 'px solid rgb(0, 0, 0)'
    }).click(function() {
        nextMode();
    });

    //createButton('10-1', 'prev');
    //createButton('10-7', 'next');
    var selector = gridToFlipCard('10-2', '10-6', 'modeselector').click(function() {
        createGame();
    });
    var preview = gridToFlipCard('4-2', '7-6', 'preview');

    selector.children('.back').css({
        'box-sizing': 'border-box',
        'background-color': '#ffffff',
        'border': border + 'px solid rgb(0, 0, 0)'
    });

    injectText('Normal', selector.children('.back'));

    preview.children('.back').css({
        'box-sizing': 'border-box',
        'background-color': '#ffffff',
        'border': border + 'px solid rgb(0, 0, 0)'
    });

    injectText('[Normal preview]', preview.children('.back'));

    setTimeout(function() {
        prev = flip(prev);
    }, 100);
    setTimeout(function() {
        preview = flip(preview);
    }, 200);
    setTimeout(function() {
        next = flip(next);
    }, 100);
    selector = flip(selector);


    setTimeout(function() {
        //doubleSelector(selector)
        //FlipcardtoArea(selector);
        FlipcardtoArea(preview);
        FlipcardtoArea(next);
        FlipcardtoArea(prev);
    }, 1000);

}

function doubleSelector(a) {
    a.children('.front').remove();
    a = a.children('.back');
    var b = a.clone();
    b.removeClass('back');
    b.addClass('front');
    b.css('backface-visibility', 'hidden')
    a.after(b);
    console.log(b)

}

function modeIndicator(container) {
    disposable = container;
    gamemode.forEach(createDiv);
}

function createDiv(Element) {

}


function nextMode() {
    arrayRotate(gamemode, true);
    $('.back.modeselector > div').text(gamemode[0]);
    $('.preview > div').text('[' + gamemode[0] + ' preview]');
}

function prevMode() {
    arrayRotate(gamemode);
    $('.back.modeselector > div').text(gamemode[0]);
    $('.preview > div').text('[' + gamemode[0] + ' preview]');
}

// --- file[uiGeneric.js] ---

/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */
function addScript(url) {
    $.getScript(url, function() {
        console.log('loaded ' + url);
        return false;
    })
}

function zIndex() {
    uniz += 1;
    return uniz;
}

function arrayRotate(arr, reverse) {
    if (reverse)
        arr.push(arr.shift());
    else
        arr.unshift(arr.pop());
    return arr;
}

function getCoords(tlbr) {
    return [Number(tlbr.split('-')[0]), Number(tlbr.split('-')[1])];
}

function updateUi() {
    //Function recalculates newline size on every beat
    recalcBar();
}


// --- file[uiDivider.js] ---

/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */
function gridToFlipCard(topleft, bottomright, classname) {
    var hasha = hashId();
    var hashb = hashId();
    var hash = hashId();
    var top = ((Number(topleft.split('-')[0]) - 1) * cellSize);
    var left = ((Number(topleft.split('-')[1]) - 1) * cellSize);

    var gridarea = roundUp(topleft, bottomright, hasha);
    gridarea.addClass('front');
    gridarea.addClass(classname);
    gridarea.addClass(hash);

    redGrid(gridarea, top, left);

    var newdiv = createArea(topleft, bottomright, hashb);
    var width = newdiv.css('width');
    var height = newdiv.css('height');

    redArea(newdiv, top, left);
    newdiv.css('background-color', 'aqua');

    newdiv.addClass('back');
    newdiv.addClass(classname);
    newdiv.addClass(hash);

    gridarea.css({
        'top': top,
        'left': left,
        'width': width,
        'height': height
    });

    var wrapper = $('<div />')
    wrapper.css({
        'position': 'absolute',
        'top': top + 'px',
        'left': left + 'px',
        'width': width,
        'height': height,
        'z-index': zIndex()
    });

    wrapper.addClass('flipcard ' + classname);
    wrapper.attr({
        'data-tl': topleft,
        'data-br': bottomright
    });

    $('.' + hash).wrapAll(wrapper);
    $('.' + classname + ' > *').removeClass(hasha);
    $('.' + classname + ' > *').removeClass(hashb);
    $('.' + classname + ' > *').removeClass(hash);

    return $('.flipcard.' + classname);
}


function FlipcardtoArea(flipcard) {
    flipcard.children('.front').remove();
    var top = flipcard.css('top');
    var left = flipcard.css('left');
    var tl = flipcard.data('tl');
    var br = flipcard.data('br');
    flipcard = flipcard.children('.back');

    flipcard.attr({
        'data-tl': tl,
        'data-br': br
    });

    flipcard.css({
        'top': top,
        'left': left,
        'z-index': zIndex()
    });

    flipcard.unwrap();
    flipcard.removeClass('back');
    return flipcard;
}


function areaToGrid(classname) {
    //Get properties out of the new grid container
    regrid = reGrid(classname);
    var grid = regrid.wrap;
    var gridhash = regrid.wraphash;
    delete regrid;
    grid.addClass('back');

    //Add hashid to area
    var areahash = hashId();
    var area = $('.' + classname);
    area.addClass(areahash);
    area.addClass('front');

    //Gather coords
    tl = area.data('tl');
    var top = (tl.split('-')[0] - 1) * cellSize;
    var left = (tl.split('-')[1] - 1) * cellSize;
    delete tl;

    //Redirect grid
    redGrid(grid, top, left);

    //Redirect area
    redArea(area, top, left);

    //Conjoin new grid and area

    //Create wrapper
    var wrapper = $('<div />');
    wrapper.css({
        'position': 'absolute',
        'top': top + 'px',
        'left': left + 'px',
        'width': area.css('width'),
        'height': area.css('height'),
        'z-index': zIndex()
    });
    wrapper.addClass('flipcard ' + classname)
    wrapper.attr({
        'data-tl': area.data('tl'),
        'data-br': area.data('br')
    });

    var flipcard = $('.' + areahash + ' , .' + gridhash).wrapAll(wrapper);

    return flipcard;
}

function FlipcardtoGrid(flipcard) {
    flipcard.children('.front').remove();
    var top = Number(flipcard.css('top').split('px')[0]);
    var left = Number(flipcard.css('left').split('px')[0]);
    var tl = flipcard.data('tl');
    var br = flipcard.data('br');
    flipcard = flipcard.children('.back');

    deGrid(flipcard, top, left);

    flipcard.unwrap();
    var grid = flipcard.children();
    grid.unwrap()
}


// --- file[uiBuilder.js] ---

/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */

var wwidth = $(window).width(); //Grabs the screen's width
var wheight = $(window).height(); //Grabs the screen's height
var cellSize; //Global cell size variable
var border; //Global border width variable
var uniz = 0;
var gamemode = ['Normal', 'Endless', 'SkipSmash', 'PaintStack'];
var disposable;

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


/*******************************/
/********** Ingame UI **********/
/*******************************/

function uiCell(size, l, cont, fluff) {
    this.size = size;
    this.left = l;
    this.content = cont;
    this.text = fluff;

    this.generate = function() {
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

        this.flip = function() {
            flip(this.flipcard);
        };
    };

}


// --- file[Swipe.js] ---

/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

var onDownPosX, onDownPosY, onEndPosX, onEndPosY;

function mouseDragStart() {
  if (game.input.activePointer.withinGame === false)
    return null;

  onDownPosX = game.input.x;
  onDownPosY = game.input.y;
}

function mouseDragMove() {

}

function mouseDragEnd() {
  if (game.input.activePointer.withinGame === false)
    return null;

  onEndPosX = game.input.x;
  onEndPosY = game.input.y;

  var diffX = onDownPosX - onEndPosX;
  var diffY = onDownPosY - onEndPosY;

  var isSwipeX = (Math.abs(diffX) > Editor_Width / 4);
  var isSwipeY = (Math.abs(diffY) > Editor_Width / 4);

  if (isSwipeX == true || isSwipeY == true) {

    if (isSwipeY == true) {
      if (Math.abs(diffY) > Math.abs(diffX)) {
        if (diffY > 0) {
          actor.move('top');

          //alert('Detected: Top Swipe');
        } else {
          //actor.move(false,true,false,false);
          actor.move('bottom');

          //alert('Detected: Bottom Swipe');
        }
      } else {
        if (diffX > 0) {
          //actor.move(false,false,false,true);
          actor.move('left');

          //alert('Detected: Left Swipe');
        } else {
          //actor.move(false,false,true,false);
          actor.move('right');

          //alert('Detected: Right Swipe');
        }
      }
    } else {
      if (diffX > 0) {
        //actor.move(false,false,false,true);
        actor.move('left');

        //alert('Detected: Left Swipe');
      } else {
        //actor.move(false,false,true,false);
        actor.move('right');

        //alert('Detected: Right Swipe');
      }
    }
  }

  onDownPosX = onEndPosX = onDownPosY = onEndPosY = 0;
}


// --- file[Math.js] ---

/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

var randomBoolean = [

  function() {
    return Math.random() < .5; // Readable, succint
  },

  function() {
    return !(Math.random() + .5 | 0); // (shortcut for Math.round)
  },

  function() {
    return !(+new Date() % 2); // faux-randomness
  }
];

// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom() {
  return Math.random();
}
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


// --- file[index.js] ---

/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

//  ++++   Supported Game Types  ++++  ///////////////////////////////////////
//  1-$ Normal      #6 w/h beatlock
//  2-$ Endless     #7 w/h beatlock
//  3-$ SkipSmash   #8 w/h beatlock
//  4-$ PaintStack  #9 w/h beatlock
//////////////////////////////////////////////////////////////////////////////

var isMultiplayerEnabled = false;

// Active game type (string)
var GameType;// = gamemode[0];

//beat refresh rate (number)
var beatRate = 1000;
//beat interval in %[0-Min, 100 Max] (number)
var beatInterval = 0;

var EnemyMoveTimeout = 0;

//editor/runtime window scale in pixels (number)
var Editor_Width = cellSize * 7;
var Editor_Height = cellSize * 7;
//the aspect ratio of the screen (decimal)
var aspect_ratio = Editor_Width / Editor_Height;
//world bounds (number)
var World_bounds_x = Editor_Width;
var World_bounds_y = Editor_Height;
//amount of cells in grid (number)
var cellsCntX = 7;
var cellsCntY = 7;
//cell scale in pixels (number)
var cellWidth;
var cellHeight;
//the color of the enemies (string)
var enemiesColor = '#b50000';
//indicates how many times game has been restared. (number)
var gameStateRestarts = 0;

//-----$*********$-----
//-----$ CLASSES $-----
//-----$*********$-----

var color;//color class instance
var grid; //grid class instance
var actor;//main actor instance
var actor1;//second actor instance
var enemy;//enemy class instance

/*~~~~~$*********$~~~~~*/
/*~~~~~$ CLASSES $~~~~~*/
/*~~~~~$*********$~~~~~*/

//indicates what s the next move gonna be. (sring)
var enemyMove;
var movesHaveBeenStored;
//indicates the time that the game actually started.(number)*ms
var LoadTime;
//indicates the elapsed time since level load.(number)*s
var timeSinceLevelLoad;
//$ phaser game instance (object)
var game;
//indicates if user lost in the previous session(boolean)
var justLost = true;
//indicates if the grid has just being expanded(boolean)
var justExpandedGrid = false;
//curor control
var cursors;
var WASDcursor;

//$ preload function $
function preload() {
  //Reset Arrays
  enemy = new Array();
  enemyMove = new Array();

  movesHaveBeenStored = false;
  cellWidth = (Editor_Width - (border * 2 * cellsCntX + border * 2)) / (cellsCntX);
  cellHeight = (Editor_Width - (border * 2 * cellsCntY + border * 2)) / (cellsCntY);
}
//$ create function $
function create() {
  //For *not* mobile devices
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //  And some controls to play the game with keyboard
    cursors = game.input.keyboard.createCursorKeys();
    cursors.left.onDown.add(function() {
      actor.move('left');
    }, this);

    cursors.right.onDown.add(function() {
      actor.move('right');
    }, this);

    cursors.down.onDown.add(function() {
      actor.move('bottom');
    }, this);

    cursors.up.onDown.add(function() {
      actor.move('top');
    }, this);

    //If multiplayer is enabled enable 2nd player controls
    if(isMultiplayerEnabled){
      var a = new Array(87, 65, 68, 83);

      var b = new Array('up', "left", "right", "down");

      WASDcursor = game.input.keyboard.addKeys(a ,b);

      WASDcursor.up.onDown.add(function() {
        actor1.move('top');
      }, this);

      WASDcursor.left.onDown.add(function() {
        actor1.move('left');
      }, this);

      WASDcursor.right.onDown.add(function() {
        actor1.move('right');
      }, this);

      WASDcursor.down.onDown.add(function() {
        actor1.move('bottom');
      }, this);
    }
  }
  // Set up handlers for mouse events
  game.input.onDown.add(mouseDragStart, this);
  game.input.onUp.add(mouseDragEnd, this);

  //add profiler
  //- https://github.com/englercj/phaser-debug -
  //game.add.plugin(Phaser.Plugin.Debug);

  color = new Color();

  //+++++++++++++++++++++++++++++
  //  Grid initialization
  //+++++++++++++++++++++++++++++

  grid = new Grid(cellsCntX, cellsCntY, cellWidth, cellHeight, '#333', '#ffffff', border * 2);
  grid.init();

  //+++++++++++++++++++++++++++++
  //  Actor initialization
  //+++++++++++++++++++++++++++++

  //multiplayer is enabed
  if(isMultiplayerEnabled){
    actor = new Actor('#006400','0-' + Math.floor(cellsCntY/2));

    actor1 = new Actor('#006400', (cellsCntX-1) + '-' + Math.ceil(cellsCntY/2));

    actor.init();
    actor1.init();
  } else {
    if (justLost === true)
      actor = new Actor('#006400');
    else {
      var _O_ = actor._c;
      actor = new Actor('#006400', grid.cell[_O_].HashId);
    }
    actor.init();
  }



  //+++++++++++++++++++++++++++++
  //  Enemies initialization
  //+++++++++++++++++++++++++++++

  if(!isMultiplayerEnabled){
    for (var i = 0; i < 3 + gameStateRestarts; i++) {
      var x = '';
      if (randomBoolean[0]() == true) {
        if (randomBoolean[0]() == true)
          x = '0-' + getRandomInt(0, cellsCntY);
        else
          x = getRandomInt(0, cellsCntX) + '-0';
      } else {
        if (randomBoolean[0]() == true)
          x = (cellsCntX - 1) + '-' + getRandomInt(0, cellsCntY);
        else
          x = getRandomInt(0, cellsCntX) + '-' + (cellsCntY - 1);
      }

      if (grid.cell[grid.getCell(x)].type === 'Normal')
        enemy.push(new Enemy(enemiesColor, x));
      else
        i--;
    }

    for (var x = 0; x < enemy.length; x++)
      enemy[x].init();

  }

  EnemyMoveTimeout = game.time.time + beatRate;
  justLost = justExpandedGrid = false;
  LoadTime = game.time.now;
}

// GAME LOOP
function update() {
  if (game.time.time > EnemyMoveTimeout) {

    for (var i = 0; i < enemy.length; i++)
      enemy[i].move(enemyMove[i]);

    //this function triggers the sfx player
    //blips_sfx.play();

    movesHaveBeenStored = false;

    //refresh move timeout
    EnemyMoveTimeout = game.time.time + beatRate;

  } else if (movesHaveBeenStored === false) {

    //We reset the predicted moves array
    enemyMove = new Array();

    for (var x = 0; x < enemy.length; x++)
      enemyMove.push(enemy[x].Nextmove());

    movesHaveBeenStored = true;
  }

  if(!isMultiplayerEnabled){
    if (GameType === 'Normal' || GameType === 'Endless') {
      //if user has killed all the enemies.
      if (enemy.length === 0)
        expand();
    } else if (GameType === 'SkipSmash') {
      if (enemy.length === 1)
        expand();
    } else if (GameType === 'PaintStack') {
      //expand grid when over 70% of it is marked
      if(Math.floor(actor.markedArea)>70)
        expand();
      else if(enemy.length === 0){

        for (var i = 0; i <Math.ceil((gameStateRestarts+1)/2); i++) {
          var x = '';
          if (randomBoolean[0]() == true) {
            if (randomBoolean[0]() == true)
              x = '0-' + getRandomInt(0, cellsCntY);
            else
              x = getRandomInt(0, cellsCntX) + '-0';
          } else {
            if (randomBoolean[0]() == true)
              x = (cellsCntX - 1) + '-' + getRandomInt(0, cellsCntY);
            else
              x = getRandomInt(0, cellsCntX) + '-' + (cellsCntY - 1);
          }

          if (grid.cell[grid.getCell(x)].type === 'Normal')
            enemy.push(new Enemy(enemiesColor, x));
          else
            i--;
        }

        for (var x = 0; x < enemy.length; x++)
          enemy[x].init();
        }

    }
  } else {

  }

  //calculate new inteval
  beatInterval = Math.round(((EnemyMoveTimeout - game.time.time) / beatRate) * 100);

  timeSinceLevelLoad = Math.round((game.time.now - LoadTime) / 1000);

  updateUi()
}

/*** newline size calculation moved here in order to fix compatibility issues ***/
function recalcBar() {
	var bar = $('.bar');
	if (beatInterval % 20 === 0) {
		bar.css('background-color', 'rgb(' + ((100 - beatInterval) * 255) / 100 + ', ' + (beatInterval * 255) / 100 + ', 0)')
	}
	bar.css('width', beatInterval + '%')
		/*if (beat < 20 && bar.css('background-color') == 'rgb(0, 128, 0)') {
			bar.css('background-color', 'rgb(204, 0, 0)')
		} else if (beat > 20 && bar.css('background-color') == 'rgb(204, 0, 0)') {
			bar.css('background-color', 'rgb(0, 128, 0)')
		}*/
}
/*** newline size calculation ended ***/

//RENDER LOOP
function render() {
  //draws cells and grid $ 1st Draw Call $
  grid.render();
  //debug text draw calls
  game.debug.text('grid: ' + cellsCntX + '-' + cellsCntY, 3, 14, '#b1ff00');
  game.debug.text('enemies: ' + enemy.length, 3, 27, '#b1ff00');
  game.debug.text('beat rate: ' + beatRate + ' ms', 3, 40, '#b1ff00');
  game.debug.text('Interval: ' + beatInterval + ' %', 3, 53, beatInterval < 20 ? '#ff0000' : '#00ff27');
  game.debug.text('time: ' + timeSinceLevelLoad + ' s', 3, 66, '#b1ff00');
  if(GameType === 'PaintStack')
    game.debug.text('marked area: ' + Math.floor(actor.markedArea) + '%' , 3, 79, '#b1ff00');
}
//$ game over $
//every game type has the same game over :)
function gameOver() {
  justLost = true;

  //reset grid back to 7x7
  cellsCntY = cellsCntX = 7;
  gameStateRestarts = 0;
  game.state.start(game.state.current);

  LoadTime = game.time.now;
}
//$ expand " grid " $
function expand() {
  justExpandedGrid = true;

  //NORMAL AND SKIPSMASH GAME TYPES
  if (GameType === 'Normal' || GameType === 'SkipSmash') {
    justLost = true;
    gameStateRestarts++;

    //increment cells by 1 if enemies > ceil(cells/2)
    if ((3 + gameStateRestarts) > Math.ceil(cellsCntX / 2))
      cellsCntY = ++cellsCntX;

    game.state.start(game.state.current);
  }
  //ENDLESS GAME TYPE
  else if (GameType === 'Endless') {
    gameStateRestarts++;

    //increment cells by 1 if enemies > ceil(cells/2)
    if ((3 + gameStateRestarts) > Math.ceil(cellsCntX / 1.5)){
      cellsCntY = cellsCntX +=2;
      justLost = true;
    }

    game.state.start(game.state.current);
  }
  //PAINTSTACK GAME TYPE
  else if (GameType === 'PaintStack') {
    justLost = true;
    gameStateRestarts++;

    //increment cells by 2 if enemies > cells
    if ((3 + gameStateRestarts) > cellsCntX )
      cellsCntY = ++cellsCntX;

    game.state.start(game.state.current);
  }
}


// --- file[Grid.js] ---

/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

//////////////////////////////////////////////////////////////////////////////
// CLASS GRID
//////////////////////////////////////////////////////////////////////////////

//@param cell/s in X dimension (number)
//@param cell/s in Y dimension (number)
//@param each cell width in pixels (number)
//@param each cell height in pixels (number)
//@param the color of the border (Web Color)
//@param the color each cell (Web Color)
//@param the thickness of the border (number)
function Grid(cellCntX, cellCntY, cellW, cellH, _color1, _color2, _bThickness) {
  this.c = _color1; //border color
  this.c2 = _color2; //cell color

  //the thickness of the border
  if (typeof(_bThickness) === 'undefined')
    this.borderThickness = 2;
  else
    this.borderThickness = _bThickness;

  this.cellsCountX = cellCntX; //cells in x dimension .
  this.cellsCountY = cellCntY; //cells in y dimension .
  this.cellWidth = cellW; //width of every cell in px .
  this.cellHeight = cellH; //height of every cell in px .

  //the grid rectangle
  this.grid;
  //grid cells
  this.cell = new Array();
}

//initialization
Grid.prototype.init = function() {
  var w = this.cellsCountX * this.cellWidth + this.borderThickness * this.cellsCountX + this.borderThickness;
  var h = this.cellsCountY * this.cellHeight + this.borderThickness * this.cellsCountY + this.borderThickness;
  this.grid = new Phaser.Rectangle((Editor_Width - w) / 2, (Editor_Height - h) / 2, w, h);

  h = (Editor_Height - h) / 2;
  w = (Editor_Width - w) / 2;
  for (var y = 0; y < this.cellsCountY; y++) {
    for (var x = 0; x < this.cellsCountX; x++) {
      var posX = w + (this.borderThickness * (x + 1)) + (this.cellWidth * x);
      var posY = h + (this.borderThickness * (y + 1)) + (this.cellHeight * y);

      this.cell.push(new Cell(posX, posY, x.toString() + '-' + y.toString(), this.c2));
    }
  }
};

//returns the  the grid,cell position of the given cell.
//@param the .hashID of the cell to search (string).
Grid.prototype.getCell = function(_id) {
  for (var i = 0; i < this.cell.length; i++) {
    if (this.cell[i].HashId == _id) {
      return i;
    }
  }
};

//render the grid on the screen
Grid.prototype.render = function() {
  game.debug.geom(this.grid, this.c);

  for (var i = 0; i < this.cell.length; i++) {
    this.cell[i].render();
  }
};

//returns the row of the given cell (number)
//@param grid.cell postition of the cell (number)
Grid.prototype.getRow = function(_currentPos) {
  var _y = this.cellsCountX;
  for (var x = 0; x < this.cellsCountX; x++) {
    if (_currentPos < _y) {
      return x;
    }
    _y += this.cellsCountX;
  }
};

//returns the column of the given cell (number)
//@param grid.cell postition of the cell (number)
Grid.prototype.getColumn = function(_currentPos) {
  for (var x = 0; x < this.cellsCountX; x++)
    for (var y = 0; y < this.cellsCountX; y++)
      if (_currentPos === (y + x * this.cellsCountX))
        return y;
};


// --- file[Enemy.js] ---

/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

//////////////////////////////////////////////////////////////////////////////
// CLASS ENEMY
//////////////////////////////////////////////////////////////////////////////

//@param enemy's color (Web Color)
//@param enemy's cell HashId  (string)
function Enemy(_color1, blockID) {
  //the color of the Enemy
  this.color = _color1;
  //
  if (typeof(blockID) === 'undefined')
    alert('Error : "blockID" is undefined');
  else
    this.block = blockID;

  //indicates if this enemy is dead
  this.isDead = false;
  //this enemys postion in  grid.cell array
  this._c;

  grid.cell[grid.getCell(this.block)].type = 'Enemy';
}

//$    INITIALIZATION    $
Enemy.prototype.init = function() {
  this._c = grid.getCell(this.block);

  grid.cell[this._c].setColor(this.color);
  grid.cell[this._c].setCellType('Enemy');
};

//move enemy
//@param direction (string)
Enemy.prototype.move = function(SwipeType) {
  switch (SwipeType) {
    case 'top':
      if (grid.cell[this._c].checkCell(SwipeType, this._c) && grid.cell[this._c - cellsCntX].type !== 'Enemy') {

        //Handle Top Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c - cellsCntX;
        //any game type except PaintStack
        if (GameType === 'PaintStack'){
          if(grid.cell[this._c].isMarked){
            actor.markedArea -= (1/(cellsCntX*cellsCntY))*100;
            grid.cell[this._c].isMarked = false;//mark the cell as not painted
          }
        }
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Enemy');



      }

      break;
    case 'bottom':
      if (grid.cell[this._c].checkCell(SwipeType, this._c) && grid.cell[this._c + cellsCntX].type !== 'Enemy') {

        //Handle Bottom Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c + cellsCntX;
        //any game type except PaintStack
        if (GameType === 'PaintStack'){
          if(grid.cell[this._c].isMarked){
            actor.markedArea -= (1/(cellsCntX*cellsCntY))*100;
            grid.cell[this._c].isMarked = false;//mark the cell as not painted
          }
        }
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Enemy');
      }

      break;
    case 'left':
      if (grid.cell[this._c].checkCell(SwipeType, this._c) && grid.cell[this._c - 1].type !== 'Enemy') {

        //Handle Left Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c - 1;
        //any game type except PaintStack
        if (GameType === 'PaintStack'){
          if(grid.cell[this._c].isMarked){
            actor.markedArea -= (1/(cellsCntX*cellsCntY))*100;
            grid.cell[this._c].isMarked = false;//mark the cell as not painted
          }
        }
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Enemy');
      }

      break;
    case 'right':
      if (grid.cell[this._c].checkCell(SwipeType, this._c) && grid.cell[this._c + 1].type !== 'Enemy') {

        //Handle Right Swap
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = this._c + 1;
        //any game type except PaintStack
        if (GameType === 'PaintStack'){
          if(grid.cell[this._c].isMarked){
            actor.markedArea -= (1/(cellsCntX*cellsCntY))*100;
            grid.cell[this._c].isMarked = false;//mark the cell as not painted
          }
        }
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Enemy');
      }

      break;
    default:
      break;
  }
};

//returns the move of this enemy(sting)
Enemy.prototype.Nextmove = function() {
  var CellsInt = actor._c - this._c;
  var RowsInt = Math.abs(grid.getRow(actor._c) - grid.getRow(this._c));

  //Enemy is ahead you
  if (CellsInt < 0) {
    if (RowsInt > 0) {
      return ('top');
    } else {
      if (this._c > actor._c) {
        return ('left');
      } else {
        return ('right');
      }
    }
  }
  //Enemy has the same position with Enemy
  else if (CellsInt === 0) {
    gameOver();
  }
  //Enemy is behind you
  else {
    if (RowsInt > 0) {
      return ('bottom');
    } else {
      if (this._c > actor._c) {
        return ('left');
      } else {
        return ('right');
      }
    }
  }
};

Enemy.prototype.Thrust = function(dir) {
  switch (dir) {
    case 'top':
      var z = this._c - cellsCntX;

      for (var x = 0; x < cellsCntX; x++) {
        z = this._c - cellsCntX;
        if (grid.cell[this._c].checkCell(dir, this._c)) {
          if (grid.cell[z].type === 'Enemy') {
            for (var i = 0; i < enemy.length; i++) {
              if (enemy[i]._c === z) {
                //enemy[i].isDead = true;
                grid.cell[z].type = 'Normal';
                enemy.splice(i, 1);
                enemyMove.splice(i, 1);
                break;
              }
            }
          }
          this.move(dir);
        } else {
          break;
        }
      }

      break;
    case 'bottom':
      var z = this._c + cellsCntX;

      for (var x = 0; x < cellsCntX; x++) {
        z = this._c + cellsCntX;
        if (grid.cell[this._c].checkCell(dir, this._c)) {
          if (grid.cell[z].type === 'Enemy') {
            for (var i = 0; i < enemy.length; i++) {
              if (enemy[i]._c === z) {
                //enemy[i].isDead = true;
                grid.cell[z].type = 'Normal';
                enemy.splice(i, 1);
                enemyMove.splice(i, 1);
                break;
              }
            }
          }
          this.move(dir);
        } else {
          break;
        }
      }

      break;
    case 'left':
      var z = this._c - 1;

      for (var x = 0; x < cellsCntX; x++) {
        z = this._c - 1;
        if (grid.cell[this._c].checkCell(dir, this._c)) {
          if (grid.cell[z].type === 'Enemy') {
            for (var i = 0; i < enemy.length; i++) {
              if (enemy[i]._c === z) {
                //enemy[i].isDead = true;
                grid.cell[z].type = 'Normal';
                enemy.splice(i, 1);
                enemyMove.splice(i, 1);
                break;
              }
            }
          }
          this.move(dir);
        } else {
          break;
        }
      }

      break;
    case 'right':
      var z = this._c + 1;

      for (var x = 0; x < cellsCntX; x++) {
        z = this._c + 1;
        if (grid.cell[this._c].checkCell(dir, this._c)) {
          if (grid.cell[z].type === 'Enemy') {
            for (var i = 0; i < enemy.length; i++) {
              if (enemy[i]._c === z) {
                //enemy[i].isDead = true;
                grid.cell[z].type = 'Normal';
                enemy.splice(i, 1);
                enemyMove.splice(i, 1);
                break;
              }
            }
          }
          this.move(dir);
        } else {
          break;
        }
      }

      break;
    default:
      break;
  }


};

////////////////////////////////////////////////////////////////////////////////
// DEPRECATED ZONE
////////////////////////////////////////////////////////////////////////////////


/*      UPDATE      */


//Enemy.prototype.update = function() {
//  if (this.isDead == true)
//    return null;
//
//  var CellsInt = actor._c - this._c;
//  var RowsInt = Math.abs(grid.getRow(actor._c) - grid.getRow(this._c));
//
//  //Enemy is ahead you
//  if (CellsInt < 0) {
//    if (RowsInt > 0) {
//      this.move('top');
//    } else {
//      if (this._c > actor._c) {
//        this.move('left');
//      } else {
//        this.move('right');
//      }
//    }
//  }
//  //Enemy has the same position with Enemy
//  else if (CellsInt === 0) {
//    gameOver();
//  }
//  //Enemy is behind you
//  else {
//    if (RowsInt > 0) {
//      this.move('bottom');
//    } else {
//      if (this._c > actor._c) {
//        this.move('left');
//      } else {
//        this.move('right');
//      }
//    }
//  }
//};


// --- file[Color.js] ---

/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

//////////////////////////////////////////////////////////////////////////////
// CLASS COLOR
//////////////////////////////////////////////////////////////////////////////

function Color() {
  //COLORS LIB
  this.Color_OceanBlue = 0x99FFFF,
  this.Color_SteelBlue = 0x4682B4,
  this.Color_RoyalBlue = 0x4169E1,
  this.Color_Aquamarine = 0x7FFFD4,
  this.Color_Blue = 0x0000FF,
  this.Color_BlueViolet  = 0x8A2BE2,
  this.Color_CadetBlue = 0x5F9EA0,
  this.Color_CornflowerBlue = 0x6495ED,
  this.Color_Cyan = 0x00FFFF,
  this.Color_DarkBlue = 0x00008B,
  this.Color_DarkCyan = 0x008B8B,
  this.Color_DodgerBlue = 0x1E90FF,
  this.Color_DeepSkyBlue = 0x00BFFF,
  this.Color_LightSteelBlue = 0xB0C4DE,
  this.Color_Navy = 0x000080,
  this.Color_PowderBlue = 0xB0E0E6,
  this.Color_Turquoise = 0x40E0D0,

  this.Color_Black = 0x000000,
  this.Color_Violet = 0xEE82EE,
  this.Color_Yellow = 0xFFFF00,
  this.Color_Tomato = 0xFF6347,
  this.Color_PaleVioletRed = 0xDB7093,
  this.Color_Red = 0xFF0000,
  this.Color_Wheat = 0xF5DEB3,
  this.Color_AntiqueWhite = 0xFAEBD7,
  this.Color_White = 0xFFFFFF;
}

Color.prototype.generateHexColor = function () {
  return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
};

Color.prototype.genetaRGBAColor = function () {
  return 'rgba(' + getRandomInt(0, 256) + ',' + getRandomInt(0, 256) + ',' + getRandomInt(0, 256) + ',' + Math.random() + ')';
};

Color.prototype.genetaRGBColor = function () {
  return 'rgba(' + getRandomInt(0, 256) + ',' + getRandomInt(0, 256) + ',' + getRandomInt(0, 256) + ', 1)';
};

Color.prototype.genetaHSLColor = function () {
  return 'hsl(' + getRandomInt(0, 256) + ',' + 100 + '%,' + 30 + '%)';
};

Color.prototype.genetaHSLAColor = function () {
  return 'hsl(' + getRandomInt(0, 256) + ',' + 100 + '%,' + 30 + '%,' + Math.random() + ')';
};


// --- file[Cell.js] ---

/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

//////////////////////////////////////////////////////////////////////////////
// CLASS CELL
//////////////////////////////////////////////////////////////////////////////

//@param world_position.x (number)
//@param world_position.y (number)
//@param cell's HashId (string)
//@param cell's color (web color)
function Cell(_posX, _posY, _name, _color) {
  this.color = _color;
  this.positionX = _posX;
  this.positionY = _posY;

  this.HashId = _name;

  //the object that holds the rectangle
  this.rect;
  //.init is being used as constructor
  this.init();

  /* indicates the type of the cell/container
   * $    1-Normal    $
   * $    2-Enemy     $
   * $    3-Actor     $
   * Default value is normal
   */
  this.type = 'Normal';
  this.isMarked = false;

  //if gametype is PaintStack cells ll keep a special
  //value indicating their generated color\
  this.genColor = '#000';
}

Cell.prototype.init = function() {
  this.rect = new Phaser.Rectangle(this.positionX, this.positionY, grid.cellWidth, grid.cellWidth);
};

/*  SET CELL TYPE   */
Cell.prototype.setCellType = function(_type) {
  if (_type != 'Normal' && _type != 'Enemy' && _type != 'Actor')
    alert('type can only be "Enemy","Normal","Actor"');
  this.type = _type;
};

/*   CELL RENDER FUNCTION   */
Cell.prototype.render = function() {
  game.debug.geom(this.rect, this.color);
};

/*   SET CELL COLOR   */
Cell.prototype.setColor = function(_clr) {
  this.color = _clr;
};

/*   CHECK CELL  */
Cell.prototype.checkCell = function(_direction, _currentPos) {
  var result = true;

  switch (_direction) {
    case 'top':
      if (_currentPos < cellsCntX) {
        result = false;
      } else {
        result = true;
      }
      //grid.cell[_currentPos - cellsCntX]

      break;
    case 'bottom':
      //if > CellsCountX*CellsCountY-CellsCountX
      if (_currentPos > (cellsCntX * grid.cellsCountY) - cellsCntX) {
        result = false;
      } else {
        result = true;
      }
      //grid.cell[_currentPos + cellsCntX]

      break;
    case 'left':

      for (var i = 0; i < cellsCntX; i++) {
        if (_currentPos === cellsCntX * i) {
          result = false;
        }
      }
      if (result == false)
        break;
      else
        result = true;

      //grid.cell[_currentPos-1]

      break;
    case 'right':

      for (var i = 0; i < cellsCntX; i++) {
        if (_currentPos === (cellsCntX * i - 1)) {
          result = false;
        }
      }
      if (result == false)
        break;
      else
        result = true;

      //grid.cell[_currentPos+1]

      break;
    default:
      break;
  }

  return result;
};


// --- file[Actor.js] ---

/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

//////////////////////////////////////////////////////////////////////////////
// CLASS ACTOR
//////////////////////////////////////////////////////////////////////////////

//@param actor's color (Web color)
//@param actor's cell HashId (string)
function Actor(_color1, blockID) {
  //actor's color
  this.color = _color1;
  //actor's HashId
  if (typeof(blockID) === 'undefined')
    this.block = Math.floor(cellsCntX / 2) + '-' + Math.floor(cellsCntX / 2);
  else
    this.block = blockID;

  //actor's position in grid.cell
  this._c;

  //enemies killed
  this.enemiesKilled = 0;

  //indicates how much of the grid has been marked %
  this.markedArea = 0;
}

Actor.prototype.init = function() {
  this._c = grid.getCell(this.block);

  grid.cell[this._c].setColor(this.color);
  grid.cell[this._c].setCellType('Actor');
};

Actor.prototype.move = function(SwipeType) {
//////////////////////////////////////////////////////////////////////////////
// NORMAL & ENDLESS & PAINTSTACK GAME TYPE  //////////////////////////////////////////////////////////////////////////////
  if (GameType !== 'SkipSmash') {

    switch (SwipeType) {
      //Handle Top Swap
      case 'top':
        this.makeMove(SwipeType, this._c - cellsCntX)

        break;
        //Handle Bottom Swap
      case 'bottom':
        this.makeMove(SwipeType, this._c + cellsCntX)

        break;
        //Handle Left Swap
      case 'left':
        this.makeMove(SwipeType, this._c - 1)

        break;
        //Handle Right Swap
      case 'right':
        this.makeMove(SwipeType, this._c + 1)

        break;
      default:
        break;
    }
  }
//////////////////////////////////////////////////////////////////////////////
// SKIPSMASH GAME TYPE
//////////////////////////////////////////////////////////////////////////////
  else {

    switch (SwipeType) {
      //Handle Top Swap
      case 'top':
        this.thrustEnemy(SwipeType, this._c - cellsCntX);

        break;
        //Handle Bottom Swap
      case 'bottom':
        this.thrustEnemy(SwipeType, this._c + cellsCntX);

        break;
        //Handle Left Swap
      case 'left':
        this.thrustEnemy(SwipeType, this._c - 1);

        break;
        //Handle Right Swap
      case 'right':
        this.thrustEnemy(SwipeType, this._c + 1);

        break;
      default:
        break;
    }
  }
};

Actor.prototype.makeMove = function(dir, z) {
  if (grid.cell[this._c].checkCell(dir, this._c)) {

    if (grid.cell[z].type === 'Enemy') {
      for (var i = 0; i < enemy.length; i++) {
        if (enemy[i]._c === z) {
          //enemy[i].isDead = true;
          enemy.splice(i, 1);
          enemyMove.splice(i, 1);
          break;
        }
      }
    }
    //set currecnt cell type as normal
    grid.cell[this._c].setCellType('Normal');
    //any game type except Paintstack
    if (GameType !== 'PaintStack'){
      grid.cell[this._c].setColor(grid.c2);

      this._c = z;
      grid.cell[this._c].setColor(this.color);
      grid.cell[this._c].setCellType('Actor');

    }
    //PaintStack game type exclusive
    //@ToDo
    else{

      //current cell hasnt been painted
      if(!grid.cell[this._c].isMarked){
        grid.cell[this._c].setColor(grid.c2);
      }
      //its painted
      else{
        //set as active color the genCol
        grid.cell[this._c].setColor(grid.cell[this._c].genColor);
      }

      this._c = z;
      //next cell hasnt been painted
      if(!grid.cell[this._c].isMarked){
        this.markedArea += (1/(cellsCntX*cellsCntY))*100;
        //parse color to genColor for backup purpose
        grid.cell[this._c].genColor = color.genetaHSLColor();
        grid.cell[this._c].isMarked = true;//mark the cell as painted
      }
      grid.cell[this._c].setColor(this.color);
      grid.cell[this._c].setCellType('Actor');

    }
  }
};

Actor.prototype.thrustEnemy = function(dir, z) {
  //if actor can move at the given direction
  if (grid.cell[this._c].checkCell(dir, this._c)) {
    //if on his path there is an enemy
    if (grid.cell[z].type === 'Enemy') {
      for (var i = 0; i < enemy.length; i++) {
        if (enemy[i]._c === z) {
          //thrust towards the given direction
          enemy[i].Thrust(dir);
          break;
        }
      }
      //if the enemy is not stuck on the border take his postion on the grid
      if (grid.cell[z].checkCell(dir, z)) {
        grid.cell[this._c].setCellType('Normal');
        grid.cell[this._c].setColor(grid.c2);

        this._c = z;
        grid.cell[this._c].setColor(this.color);
        grid.cell[this._c].setCellType('Actor');
      }
    } else {
      grid.cell[this._c].setCellType('Normal');
      grid.cell[this._c].setColor(grid.c2);

      this._c = z;
      grid.cell[this._c].setColor(this.color);
      grid.cell[this._c].setCellType('Actor');
    }
  }
};


// --- file[Tunes.js] ---

/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

var blips_sfx = jsfxlib.createWave(["sine", 0.0000, 0.4000, 0.0000, 0.0920, 0.0000, 0.2080, 20.0000, 286.0000, 2400.0000, -0.6740, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0480, 0.0000]);


