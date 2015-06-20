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
