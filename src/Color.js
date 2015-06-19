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
    this.Color_RoyalBlue = 0xFF0000,
    this.Color_DarkBlue = 0x0099FF,
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
