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
        'position': 'fixed',
        'top': top + 'px',
        'left': left + 'px',
        'width': width,
        'height': height
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

function removeFlipcard(flipcard) {

}