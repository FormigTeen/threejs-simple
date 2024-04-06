uniform float uAmp;
uniform float uTime;

varying vec3 aVertex;

varying float z;

void main(void) {

    z = uAmp * sin(position.x*0.2 + uTime) * cos(position.y*0.5 + uTime);;

	aVertex = vec3(1.0, 1.0, 0.0);

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);

}
