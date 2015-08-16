#!/bin/bash
sudo apt-get -qq update
npm install uglify-js -g
uglifyjs ../src/Assets/Shaders.js ../src/Assets/Tunes.js ../src/Actor.js ../src/Cell.js ../src/Color.js ../src/Enemy.js ../src/Grid.js ../src/index.js ../src/Math.js ../src/Swipe.js ../src/uiBuilder.js ../src/uiDivider.js  ../src/uiGeneric.js ../src/uiIndex.js ../src/uiSelector.js -o skipstack.min.js --source-map skipstack.min.js.map -c -m

#uglifyjs ../lib/jquery.min.js ../lib/jquery.transit.min.js ../lib/jquery.jrumble.1.3.min.js ../lib/jquery.touchSwipe.min.js ../lib/audio.js ../lib/jsfx.js ../lib/jsfxlib.js ../lib/phaser.min.js -o skipstack.lib.min.js --source-map skipstack.lib.min.js.map -c -m
