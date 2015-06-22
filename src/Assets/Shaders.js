var fragmentSrc = [
    "precision mediump float;uniform float time;uniform vec2 resolution;void main(void){gl_FragColor=vec4(1. / ( 100. * abs((2. * length((2.0 * gl_FragCoord.xy - resolution.xy) / min(resolution.x, resolution.y)) - sin(1.- time)*2.))) * vec3(1.0,0.0,0.0), 1.);}"
];
