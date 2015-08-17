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

var soundsOn = false;

var filter;
var isfilterEnabled = false;

// Active game type (string)
var GameType; // = gamemode[0];

//beat refresh rate (number)
var beatRate = 1000;
//beat interval in %[0-Min, 100 Max] (number)
var beatInterval = 0;

var EnemyMoveTimeout = 0;

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

var color; //color class instance
var grid; //grid class instance
var actor; //main actor instance
var actor1; //second actor instance
var enemy; //enemy class instance

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
    console.log('Preload Function');
    //Reset Arrays
    enemy = [];
    enemyMove = [];

    movesHaveBeenStored = false;
    cellWidth = (Editor_Width - (border * 2 * cellsCntX + border * 2)) / (cellsCntX);
    cellHeight = (Editor_Width - (border * 2 * cellsCntY + border * 2)) / (cellsCntY);
}
//$ create function $
function create() {
    console.log('Create Function');
    filter = new Phaser.Filter(game, null, get_loadingCellShader2());
    filter.setResolution(Editor_Width, Editor_Height);
    //For *not* mobile devices
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //  And some controls to play the game with keyboard
        cursors = game.input.keyboard.createCursorKeys();
        cursors.left.onDown.add(function () {
            actor.move('left');
        }, this);

        cursors.right.onDown.add(function () {
            actor.move('right');
        }, this);

        cursors.down.onDown.add(function () {
            actor.move('down');
        }, this);

        cursors.up.onDown.add(function () {
            actor.move('up');
        }, this);

        //If multiplayer is enabled enable 2nd player controls
        if (isMultiplayerEnabled === true) {
            var a = [87, 65, 68, 83], b = ['up', "left", "right", "down"];

            WASDcursor = game.input.keyboard.addKeys(a, b);

            WASDcursor.up.onDown.add(function () {
                actor1.move('up');
            }, this);

            WASDcursor.left.onDown.add(function () {
                actor1.move('left');
            }, this);

            WASDcursor.right.onDown.add(function () {
                actor1.move('right');
            }, this);

            WASDcursor.down.onDown.add(function () {
                actor1.move('down');
            }, this);
        }
    }
    // Set up handlers for mouse events
    //game.input.onDown.add(mouseDragStart, this);
    //game.input.onUp.add(mouseDragEnd, this);

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
    if (isMultiplayerEnabled === true) {
        actor = new Actor('#006400', '0-' + Math.floor(cellsCntY / 2));

        actor1 = new Actor('#006400', (cellsCntX - 1) + '-' + Math.ceil(cellsCntY / 2));

        actor.init();
        actor1.init();
    } else {
        if (justLost === true) {
            actor = new Actor('#006400');
        } else {
            var bl = actor._c;
            actor = new Actor('#006400', grid.cell[bl].HashId);
        }
        actor.init();
    }



    //+++++++++++++++++++++++++++++
    //  Enemies initialization
    //+++++++++++++++++++++++++++++

    if (isMultiplayerEnabled === false) {
        var x = '', i;
        for (i = 0; i < 3 + gameStateRestarts; i++) {
            if (randomBoolean[0]() === true) {
                if (randomBoolean[0]() === true) {
                    x = '0-' + getRandomInt(0, cellsCntY);
                } else {
                    x = getRandomInt(0, cellsCntX) + '-0';
                }
            } else {
                if (randomBoolean[0]() === true) {
                    x = (cellsCntX - 1) + '-' + getRandomInt(0, cellsCntY);
                } else {
                    x = getRandomInt(0, cellsCntX) + '-' + (cellsCntY - 1);
                }
            }

            if (grid.cell[grid.getCell(x)].type === 'Normal') {
                enemy.push(new Enemy(enemiesColor, x));
            } else {
                i--;
            }
        }

        for (x = 0; x < enemy.length; x++) {
            enemy[x].init();
        }
    }

    EnemyMoveTimeout = game.time.time + beatRate;
    justLost = justExpandedGrid = false;
    LoadTime = game.time.now;

    $("#gamecont").swipe({
        //Generic swipe handler for all directions
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            actor.move(direction);
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 0
    });
}

// GAME LOOP
function update() {

    var i, x;
    // reduced total cost by 3%
    if( isfilterEnabled === true ){
        filter.update();
    }
    //draws cells and grid $ 1st Draw Call $
    grid.render();
    if (game.time.time > EnemyMoveTimeout) {
        for (i = 0; i < enemy.length; i++) {
            enemy[i].move(enemyMove[i]);
        }

        if(soundsOn){
            //this function triggers the sfx player
            blips_sfx.play();
        }

        movesHaveBeenStored = false;

        //refresh move timeout
        EnemyMoveTimeout = game.time.time + beatRate;

    } else if (movesHaveBeenStored === false) {

        //We reset the predicted moves array
        enemyMove = [];

        for (x = 0; x < enemy.length; x++) {
            enemyMove.push(enemy[x].Nextmove());
        }

        movesHaveBeenStored = true;
    }

    if (!isMultiplayerEnabled) {

        if (GameType === 'Normal' || GameType === 'Endless') {
            //if user has killed all the enemies.
            if (enemy.length === 0) {
                expand();
            }
        } else if (GameType === 'SkipSmash') {
            if (enemy.length === 1) {
                expand();
            }

        } else if (GameType === 'PaintStack') {
            //expand grid when over 70% of it is marked
            if (Math.floor(actor.markedArea) > 70) {
                expand();
            } else if (enemy.length === 0) {

                for (i = 0; i < Math.ceil((gameStateRestarts + 1) / 2); i++) {
                    x = '';
                    if (randomBoolean[0]() === true) {
                        if (randomBoolean[0]() === true) {
                            x = '0-' + getRandomInt(0, cellsCntY);
                        } else {
                            x = getRandomInt(0, cellsCntX) + '-0';
                        }
                    } else {
                        if (randomBoolean[0]() === true) {
                            x = (cellsCntX - 1) + '-' + getRandomInt(0, cellsCntY);
                        } else {
                            x = getRandomInt(0, cellsCntX) + '-' + (cellsCntY - 1);
                        }
                    }

                    if (grid.cell[grid.getCell(x)].type === 'Normal') {
                        enemy.push(new Enemy(enemiesColor, x));
                    } else {
                        i--;
                    }
                }

                for (x = 0; x < enemy.length; x++) {
                    enemy[x].init();
                }
            }

        }
    } else {
        // chill! There's nothing to do
    }

    //calculate new inteval
    beatInterval = Math.round(((EnemyMoveTimeout - game.time.time) / beatRate) * 100);

    timeSinceLevelLoad = Math.round((game.time.now - LoadTime) / 1000);

    updateUi();
    // reduced total cost by 2%
    //render();

}

function recalcBar() {
    var bar = $('.bar');
    if (beatInterval % 20 === 0) {
        bar.css('background-color', 'rgb(' + ((100 - beatInterval) * 255) / 100 + ', ' + (beatInterval * 255) / 100 + ', 0)');
    }
    bar.css('width', beatInterval + '%');
}

//RENDER LOOP
function render() {

    //debug text draw calls
    game.debug.text('grid: ' + cellsCntX + '-' + cellsCntY, 3, 14, '#b1ff00');
    game.debug.text('enemies: ' + enemy.length, 3, 27, '#b1ff00');
    game.debug.text('beat rate: ' + beatRate + ' ms', 3, 40, '#b1ff00');
    game.debug.text('Interval: ' + beatInterval + ' %', 3, 53, beatInterval < 20 ? '#ff0000' : '#00ff27');
    game.debug.text('time: ' + timeSinceLevelLoad + ' s', 3, 66, '#b1ff00');
    if (GameType === 'PaintStack') {
        game.debug.text('marked area: ' + Math.floor(actor.markedArea) + '%', 3, 79, '#b1ff00');
    }
}
//$ game over $
//every game type has the same game over :)
function gameOver() {
    console.clear();
    justLost = true;

    //reset grid back to 7x7
    cellsCntY = cellsCntX = 7;
    gameStateRestarts = 0;
    game.state.start(game.state.current);

    LoadTime = game.time.now;
}
//$ expand " grid " $
function expand() {
    if(soundsOn){
        // play random tune from levelup_sfx array
        levelup_sfx[getRandomInt(0,levelup_sfx.length)].play();
    }

    justExpandedGrid = true;

    gameStateRestarts++;
    //NORMAL AND SKIPSMASH GAME TYPES
    if (GameType === 'Normal' || GameType === 'SkipSmash') {
        justLost = true;

        //increment cells by 1 if enemies > ceil(cells/2)
        if ((3 + gameStateRestarts) > Math.ceil(cellsCntX / 2)) {
            cellsCntY = ++cellsCntX;
        }

        game.state.start(game.state.current);
    }
    //ENDLESS GAME TYPE
    else if (GameType === 'Endless') {

        //increment cells by 1 if enemies > ceil(cells/2)
        if ((3 + gameStateRestarts) > Math.ceil(cellsCntX / 1.5)) {
            cellsCntY = cellsCntX += 2;
            justLost = true;
        }

        game.state.start(game.state.current);
    }
    //PAINTSTACK GAME TYPE
    else if (GameType === 'PaintStack') {
        justLost = true;

        //increment cells by 2 if enemies > cells
        if ((3 + gameStateRestarts) > cellsCntX) {
            cellsCntY = ++cellsCntX;
        }

        game.state.start(game.state.current);
    }
}
