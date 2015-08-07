#!/bin/bash

function program_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

function npm_package_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  ls node_modules | grep $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

if [ $(program_is_installed nodejs) == 1 ]; then
    sudo apt-get install nodejs
fi

# NPM

if [ $(program_is_installed npm) == 1 ]; then
    sudo apt-get install npm
fi

# NPM MODULES

# for use as a command line app
sudo npm install uglify-js -g
sudo apt-get -qq update

uglifyjs ../src/Assets/Shaders.js ../src/Assets/Tunes.js ../src/Actor.js ../src/Cell.js ../src/Color.js ../src/Enemy.js ../src/Grid.js ../src/index.js ../src/Math.js ../src/Swipe.js ../src/uiBuilder.js ../src/uiDivider.js  ../src/uiGeneric.js ../src/uiIndex.js ../src/uiSelector.js -o skipstack.min.js --source-map skipstack.min.js.map -c -m
