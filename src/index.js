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

// indicates if multiplayer is enabled
var isMultiplayerEnabled = false;

// SkipStack namespace
var SkipStack = SkipStack || {
    /**
     * SkipStack version number.
     * @constant
     * @type {string}
     */
    version: '0.0.1',

    /**
     * Indicates if sound is on or off
     * @constant
     * @type {boolean}
     */
    soundsOn: true,

    /**
     * stored total score for each game mode.
     * @constant
     * @type {Array<number>}
     */
    TotalScore: [0, 0, 0, 0],

    /**
     * current score
     * @constant
     * @type {number}
     */
    CurrentScore: 0,

    /**
     * isPaused
     * @constant
     * @type {boolean}
     */
    isPaused: true,

    /**
     * isCountdownEnabled
     * @constant
     * @type {boolean}
     */
    isCountdownEnabled: true

};

//
var filter;

//
var isfilterEnabled = false;

// Active game type (string)
var GameType; // = gamemode[0];

//beat refresh rate (number)
var beatRate = 1000;

//beat interval in %[0-Min, 100 Max] (number)
var beatInterval = 0;

//
var EnemyMoveTimeout = 0;

//amount of cells in grid (number)
var cellsCntX = 7,
    cellsCntY = 7;

//cell scale in pixels (number)
var cellWidth, cellHeight;

//the color of the enemies (string)
var enemiesColor = '#b50000';

//indicates how many times game has been restared. (number)
var gameStateRestarts = 0;

//-----$*********$-----
//-----$ CLASSES $-----
//-----$*********$-----

//color class instance
var color;

//grid class instance
var grid;

//main actor instance
var actor;

//second actor instance
var actor1;

//enemy class instance
var enemy;

/*~~~~~$*********$~~~~~*/
/*~~~~~$ CLASSES $~~~~~*/
/*~~~~~$*********$~~~~~*/

//indicates what s the next move gonna be. (sring)
var enemyMove;

//
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

//
var timesExpanded = 0;

//curor control
var cursors, WASDcursor;

//$ preload function $
function preload() {
    console.log('Preload Function');
    //Reset Arrays
    enemy = enemyMove = [];

    movesHaveBeenStored = false;
    cellWidth = (Editor_Width - (border * 2 * cellsCntX + border * 2)) / (cellsCntX);
    cellHeight = (Editor_Width - (border * 2 * cellsCntY + border * 2)) / (cellsCntY);
}
//$ create function $
function create() {
    console.log('Create Function');
    filter = new Phaser.Filter(game, null, get_loadingShader2());
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
            var a = [87, 65, 68, 83],
                b = ['up', "left", "right", "down"];

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

    if (SkipStack.isCountdownEnabled === true) {
        var sprite = game.add.sprite();
        sprite.width = Editor_Width;
        sprite.height = Editor_Height;
        sprite.filters = [filter];
        var text = game.add.text(game.world.centerX / 1.15, game.world.centerY / 1.3, "5", {
            font: "Bold " + Editor_Width / 5 + "px Arial",
            fill: 'rgb(0, 179, 204)',
            align: "center"
        });

        setTimeout(function () {
            text.text = "4";
            setTimeout(function () {
                text.text = "3";
                setTimeout(function () {
                    text.text = "2";
                    setTimeout(function () {
                        text.text = "1";
                        setTimeout(function () {
                            text.text = "";
                            sprite.destroy();
                            SkipStack.isCountdownEnabled = false;
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);

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
        var x = '',
            i;
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

    if (SkipStack.isCountdownEnabled === true) {
        return filter.update();
    }

    var i, x;
    // reduced total cost by 3%
    if (isfilterEnabled === true) {
        filter.update();
    }
    //draws cells and grid $ 1st Draw Call $
    grid.render();
    if (game.time.time > EnemyMoveTimeout) {
        for (i = 0; i < enemy.length; i++) {
            enemy[i].move(enemyMove[i]);
        }

        if (SkipStack.soundsOn) {
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
    // total cost is 2%
    render();

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
    game.debug.text('Level: ' + SkipStack.CurrentScore, 3, 79, '#b1ff00');
    if (GameType === 'PaintStack') {
        game.debug.text('marked area: ' + Math.floor(actor.markedArea) + '%', 3, 92, '#b1ff00');
    }

}
//$ game over $
//every game type has the same game over :)
function gameOver() {

    // clear console
    console.clear();

    // turn justLost flag to true
    justLost = true;

    //reset grid back to 7x7
    cellsCntY = cellsCntX = 7;

    // Refresh LoadTIme
    LoadTime = game.time.now;

    if (GameType === 'Normal') {

        // Update Normal gametype total score
        SkipStack.TotalScore[0] += SkipStack.CurrentScore;

    } else if (GameType === 'SkipSmash') {

        // Update SkipSmash gametype total score
        SkipStack.TotalScore[2] += SkipStack.CurrentScore;

    } else if (GameType === 'Endless') {

        // Update Endless gametype total score
        SkipStack.TotalScore[1] += SkipStack.CurrentScore;

    } else if (GameType === 'PaintStack') {

        // Update PaintStack gametype total score
        SkipStack.TotalScore[3] += SkipStack.CurrentScore;

    }

    // Reset $gameStateRestarts, $timesExpanded back to 0
    SkipStack.CurrentScore = gameStateRestarts = timesExpanded = 0;

    // Enable countdown
    SkipStack.isCountdownEnabled = true;

    // "Restart" the game
    game.state.start(game.state.current);

}

//$ expand " grid " $
function expand() {

    var qq = Math.ceil(cellsCntX + timesExpanded * cellsCntX / 2);

    if (SkipStack.soundsOn) {
        // play random tune from levelup_sfx array
        levelup_sfx[getRandomInt(0, levelup_sfx.length)].play();
    }

    justExpandedGrid = true;

    // increase current score and gamerestarts by 1
    SkipStack.CurrentScore = ++gameStateRestarts;

    //NORMAL TYPE
    if (GameType === 'Normal') {
        justLost = true;

        // expand grid by 1 cell if enemies > Math.ceil(cellsCntX + timesExpanded * cellsCntX / 2)
        if ((3 + gameStateRestarts) > qq) {
            timesExpanded++;
            cellsCntY = ++cellsCntX;
        }

    }
    //SKIPSMASH GAME TYPE
    else if (GameType === 'SkipSmash') {
        justLost = true;

        // expand grid by 1 cell if enemies > Math.ceil(cellsCntX + timesExpanded * cellsCntX / 3)
        if ((3 + gameStateRestarts) > Math.ceil(cellsCntX + timesExpanded * cellsCntX / 3)) {
            timesExpanded++;
            cellsCntY = ++cellsCntX;
        }

    }
    //ENDLESS GAME TYPE
    else if (GameType === 'Endless') {

        // expand grid by 1 cell if enemies > Math.ceil(cellsCntX + timesExpanded * cellsCntX / 2)
        if ((3 + gameStateRestarts) > qq) {
            cellsCntY = cellsCntX += 2;
            justLost = true;
        }

    }
    //PAINTSTACK GAME TYPE
    else if (GameType === 'PaintStack') {
        justLost = true;

        // expand grid by 1 cell if enemies > Math.ceil(cellsCntX + timesExpanded * cellsCntX / 4)
        if ((3 + gameStateRestarts) > Math.ceil(cellsCntX + timesExpanded * cellsCntX / 4)) {
            cellsCntY = ++cellsCntX;
        }

    }

    // Disable countdown
    SkipStack.isCountdownEnabled = false;

    // "Restart" the game
    game.state.start(game.state.current);

}
