precision mediump float;

uniform float fHeight;
uniform float fCenter;


varying vec3 aVertex;
varying float z;

void main(void) {

    float vHeight = z;
    float fMaxHeight = (fCenter + fHeight);
    float fMinHeight = (fCenter - fHeight);
    float fMediumHeight = fMaxHeight / 2.0;


    float fRelativePosition = (vHeight - fMinHeight) / (fMaxHeight - fMinHeight);

    if ( fRelativePosition < 0.0) {
        fRelativePosition = 0.0;
    } else if ( fRelativePosition > 1.0) {
        fRelativePosition = 1.0;
    }

    vec4 resultColor = vec4(0.0, 0.0, 0.0, 1.0);
    resultColor = vec4(0.0 + fRelativePosition, 0.0 + fRelativePosition, 1.0, 1.0);

    gl_FragColor = resultColor;
}
