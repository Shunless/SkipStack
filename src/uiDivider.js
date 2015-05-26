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

    gridarea.children('.cell').each(function() {
        $(this).css('top', (Number($(this).css('top').split('px')[0]) - top) + 'px');
        $(this).css('left', (Number($(this).css('left').split('px')[0]) - left) + 'px');
    });

    var newdiv = createArea(topleft, bottomright, hashb);
    var width = newdiv.css('width');
    var height = newdiv.css('height');

    newdiv.css('top', '0');
    newdiv.css('left', '0');
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
        'z-index': uniz
    });
    uniz += 1;
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

function removeFlipcard(flipcard) {
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
        'z-index': uniz
    });
	uniz += 1;

    flipcard.unwrap();
    flipcard.removeClass('back');
    return flipcard;
}