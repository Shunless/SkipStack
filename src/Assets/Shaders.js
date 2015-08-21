/**
 * @author Alex Mourtziapis
 * @copyright 2015 Shunless Studio.
 */

//NxZ grid compattible shader for loading\
/* http://glslsandbox.com/e#26223.2 */
function get_loadingCellShader() {
    return [
        "#define PI 3.14159265359",
        "precision mediump float;uniform float time;uniform vec2 mouse;uniform vec2 resolution;mat2 rotate2d(float _angle){return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle));}vec3 hsv(float h, float s, float v){return mix(vec3(1.0),clamp((abs(fract( h+vec3(3.0, 2.0, 1.0)/3.0)*6.0-3.0)-1.0), 0.0, 1.0),s)*v;}float shape(vec2 p){return abs(p.x)+abs(p.y)-1.0;}void main( void ){vec2 uv=gl_FragCoord.xy/resolution.xy;vec2 pos=uv*2.0-1.0;pos.x *=resolution.x/resolution.y;pos=pos*cos(0.00005)+vec2(pos.y,-pos.x)*sin(0.00005);pos.x +=1.0;pos.y +=1.0;pos=mod(pos*" + cellsCntX + ".0, 2.0)-1.0;uv -=vec2(0.5);pos=rotate2d( sin(time)*PI ) * pos;uv +=vec2(0.5);float c=0.05/abs(sin(0.3*shape(3.0*pos)));vec3 col=hsv(fract(0.1*time),1.0,1.0);gl_FragColor=vec4(col*c,1.0);}"
    ];
}
//NxZ grid compattible shader for loading\
/* Source: http://glslsandbox.com/e#26360.0 */
function get_loadingCellShader2() {
    return [
        "#define PI 3.14159265359",
        "precision mediump float;uniform float time;uniform vec2 mouse;uniform vec2 resolution;mat2 rotate2d(float _angle){return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle));}float segm( float a, float b, float c, float x ){return smoothstep(a-c,a,x) - smoothstep(b,b+c,x);}vec3 hsv(float h, float s, float v){return mix(vec3(1.0),clamp((abs(fract( h+vec3(3.0, 2.0, 1.0)/3.0)*6.0-3.0)-1.0), 0.0, 1.0),s)*v;}float shape(vec2 p){return mod(length(sin(p.x) - p.xy + sin(p.y) - p.xy) / 9000.0 , length(p) - 2.8 );}void main( void ){vec2 uv=gl_FragCoord.xy/resolution.xy;vec2 pos=uv*2.0-1.0;pos.x *=resolution.x/resolution.y;pos=pos*cos(0.00005)+vec2(pos.y,-pos.x)*sin(0.00005);pos.x +=1.0;pos.y +=1.0;pos=mod(pos*" + cellsCntX + ".0, 2.0)-1.0;float c=0.01/abs(sin(0.2*shape((3.0+abs(sin(time)*4.0))*pos)));vec3 col=hsv(fract(uv.x*uv.y+(abs(pow(time,0.94))+1.0)),0.9+sin(time)/10.0,0.5+abs(sin(time))/2.0);gl_FragColor=vec4(1.0-(col-c),1.0);}"
    ];
}

function get_loadingShader() {
    return [
        "precision mediump float;uniform float time;uniform vec2 mouse;uniform vec2 resolution;void main( void ){gl_FragColor=vec4( 1.0 );vec2 p=(gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;vec2 r=vec2(length(p), atan(p.x, p.y));r.y=fract(time+4.*r.x/3.14);if(r.y > .22 && r.x < .9 && r.y < 0.9){gl_FragColor.rg *=vec2(0.7, .8);}}"
    ];
}

/* Source: http://glslsandbox.com/e#27255.0 */
function get_loadingShader2() {
    return [
        "precision mediump float;uniform float time;uniform vec2 resolution;void main( void ){gl_FragColor=vec4( 1.0 );vec2 p=gl_FragCoord.xy / resolution -0.5;vec2 r=vec2(length(p), atan(p.x, p.y));r.y=fract(time+abs(1.0-sin(time)*3.0)*r.y/3.141592653);if(r.x > .22 && r.x < .4 && r.y < 0.9){gl_FragColor.rgb *=vec3(0.0, 0.7, 0.8);}}"
    ];
}

/* http://glslsandbox.com/e#26234.2 */
var shader_loadin0 = [
    "#define PI 3.14159265359",
    "precision mediump float;uniform float time;uniform vec2 mouse;uniform vec2 resolution;mat2 rotate2d(float _angle){return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle));}vec3 hsv(float h, float s, float v){return mix(vec3(1.0),clamp((abs(fract( h+vec3(3.0, 2.0, 1.0)/3.0)*6.0-3.0)-1.0), 0.0, 1.0),s)*v;}float shape(vec2 p){return abs(p.x*3.0)+abs(p.y*3.)-1.0-sin(time)*10.0;}void main( void ){vec2 uv=gl_FragCoord.xy/resolution.xy;vec2 pos=uv*2.0-1.0;pos.x *=resolution.x/resolution.y;pos=pos*cos(0.00005)+vec2(pos.y,-pos.x)*sin(0.00005);pos.x +=1.0;pos.y +=1.0;pos=mod(pos*7.0, 2.0)-1.0;uv -=vec2(0.5);pos=rotate2d( sin(0.)*PI ) * pos;uv +=vec2(0.5);float c=0.05/abs(sin(0.3*shape(3.0*pos)));vec3 col=hsv(fract(0.1*time),1.0,1.0);gl_FragColor=vec4(col*c,1.0);}"
];
