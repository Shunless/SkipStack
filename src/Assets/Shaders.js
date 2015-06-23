/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

//NxZ grid compattible shader for loading\
/* http://glslsandbox.com/e#26223.2 */
function get_loadingShader (){
  return [
    "#define PI 3.14159265359",
    "precision mediump float;uniform float time;uniform vec2 mouse;uniform vec2 resolution;mat2 rotate2d(float _angle){return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle));}vec3 hsv(float h, float s, float v){return mix(vec3(1.0),clamp((abs(fract( h+vec3(3.0, 2.0, 1.0)/3.0)*6.0-3.0)-1.0), 0.0, 1.0),s)*v;}float shape(vec2 p){return abs(p.x)+abs(p.y)-1.0;}void main( void ){vec2 uv=gl_FragCoord.xy/resolution.xy;vec2 pos=uv*2.0-1.0;pos.x *=resolution.x/resolution.y;pos=pos*cos(0.00005)+vec2(pos.y,-pos.x)*sin(0.00005);pos.x +=1.0;pos.y +=1.0;pos=mod(pos*"+ cellsCntX +".0, 2.0)-1.0;uv -=vec2(0.5);pos=rotate2d( sin(time)*PI ) * pos;uv +=vec2(0.5);float c=0.05/abs(sin(0.3*shape(3.0*pos)));vec3 col=hsv(fract(0.1*time),1.0,1.0);gl_FragColor=vec4(col*c,1.0);}"
];


}

/* http://glslsandbox.com/e#26234.2 */
var shader_loadin0 = [
  "#define PI 3.14159265359",
  "precision mediump float;uniform float time;uniform vec2 mouse;uniform vec2 resolution;mat2 rotate2d(float _angle){return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle));}vec3 hsv(float h, float s, float v){return mix(vec3(1.0),clamp((abs(fract( h+vec3(3.0, 2.0, 1.0)/3.0)*6.0-3.0)-1.0), 0.0, 1.0),s)*v;}float shape(vec2 p){return abs(p.x*3.0)+abs(p.y*3.)-1.0-sin(time)*10.0;}void main( void ){vec2 uv=gl_FragCoord.xy/resolution.xy;vec2 pos=uv*2.0-1.0;pos.x *=resolution.x/resolution.y;pos=pos*cos(0.00005)+vec2(pos.y,-pos.x)*sin(0.00005);pos.x +=1.0;pos.y +=1.0;pos=mod(pos*7.0, 2.0)-1.0;uv -=vec2(0.5);pos=rotate2d( sin(0.)*PI ) * pos;uv +=vec2(0.5);float c=0.05/abs(sin(0.3*shape(3.0*pos)));vec3 col=hsv(fract(0.1*time),1.0,1.0);gl_FragColor=vec4(col*c,1.0);}"
];
