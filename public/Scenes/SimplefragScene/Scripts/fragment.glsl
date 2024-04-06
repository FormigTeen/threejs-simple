#ifdef GL_ES
    precision mediump float;
#endif

varying vec2 aVertex;

uniform float uTime;
uniform vec2 uDim;
uniform float fMode;

void main () {

    // Simples
    float fDistance = 0.0;
    float fMaxDistance = 1.0;

    if ( fMode == 1.0 ) {
        // Euclidiano
         fDistance = sqrt(pow((aVertex.x), 2.0) + pow((aVertex.y), 2.0));
        fMaxDistance = (min(uDim.x, uDim.y) / 2.0);
    } else if ( fMode == 2.0 ) {
        // Manhattan
        fDistance = abs(aVertex.x) + abs(aVertex.y);
        fMaxDistance = (uDim.x / 2.0) + (uDim.y + 2.0);
    } else if ( fMode == 3.0 ) {
        // Cheb
        fDistance = max(abs(aVertex.x), abs(aVertex.y));
        fMaxDistance = max(uDim.x, uDim.y) / 2.0;
    }



    float fRelativeDistance = fDistance / fMaxDistance;

    if ( fRelativeDistance <= 1.0 ) {
        gl_FragColor = vec4(1.0 - fRelativeDistance, 0.0, 0.0, 1.0);;
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);;
    }

  }