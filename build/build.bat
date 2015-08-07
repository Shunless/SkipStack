@echo on
call npm install uglify-js -g
call uglifyjs ../src/Assets/Shaders.js ../src/Assets/Tunes.js ../src/Actor.js ../src/Cell.js ../src/Color.js ../src/Enemy.js ../src/Grid.js ../src/index.js ../src/Math.js ../src/Swipe.js ../src/uiBuilder.js ../src/uiDivider.js  ../src/uiGeneric.js ../src/uiIndex.js ../src/uiSelector.js -o skipstack.min.js --source-map skipstack.min.js.map -c -m
PAUSE