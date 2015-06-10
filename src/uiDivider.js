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

