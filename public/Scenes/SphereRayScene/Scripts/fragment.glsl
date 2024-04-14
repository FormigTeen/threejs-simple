precision mediump float;

		uniform vec3 uCamPos;

		vec3 eCenter 	= vec3(0.0, 0.0, 0.0);
		vec3 	O, 
				P;

		float eRadius 	= 3.0;
		vec3 lPos 		= vec3(0.5, 1.0, 0.3);
		vec3 lColor 	= vec3(1.0, 1.0, 1.0);
		vec3 dColor 	= vec3(1.0, 0.0, 0.0);
		vec3 eColor 	= vec3(1.0, 1.0, 1.0);
		float nCos		= 50.0;

		vec4 ambient 	= vec4(0.1, 0.1, 0.1, 1.0);

		varying vec3 vWorld; 

		/// *********************************************
		float rayHitSphere(vec3 ray) {
			float a = dot(ray, ray);
			float b = 2.0 * dot(O, ray);
			float c = dot (O, O) - eRadius*eRadius;
			float delta = b*b - (4.0*a*c);

			if (delta < 0.0)
				return -1.0;
			
			return  min( ((-b) - sqrt(delta)) / (2.0*a), 
						 ((-b) + sqrt(delta)) / (2.0*a) );
			}	

		/// *********************************************
		vec4 CorDeFundo(vec3 ray) {
			float t = (ray.y + 10.0) / 20.0;
			return (vec4((1.0-t)*vec3(1.0, 1.0, 1.0) + t*vec3(0.5, 0.7, 1.0), 1.0));
			}

		/// *********************************************
		vec4 compDifusa(vec3 ray, float t) {
			vec3 pW = O + t * ray;

			vec3 N = normalize(2.0 * pW);			

			vec3 L = normalize(lPos); 				// Luz direcional

			float cTeta = max(dot(L,N), 0.0);

			vec4 difColor = vec4(lColor * dColor * cTeta, 1.0);

			return difColor;
			}

		/// *********************************************
		vec4 compEspecular(vec3 ray, float t) {
			vec3 pW = O + t * ray;

			vec3 N = normalize(2.0 * pW);

			vec3 L = normalize(lPos); 	// Luz direcional

			vec3 vV = normalize(O - pW); 
		 	vec3 vR = reflect(-L, N); 

		 	float omega = dot(vV, vR); 

		 	vec4 specular = clamp(vec4(lColor.rgb * eColor.rgb * pow(omega, nCos), 1.0), 0.0, 1.0); 

			return specular;
			}
		
		/// *********************************************
		/// *********************************************
		void main(void) {	

			O = uCamPos - eCenter;
			P = vWorld - eCenter;

			vec3 D = P - O;

			float t = rayHitSphere(D);

			if (t == -1.0) 
				gl_FragColor = CorDeFundo(D);
			else {
				vec4 difuse 	= compDifusa(D,t);
				vec4 specular 	= compEspecular(D,t);
				gl_FragColor = clamp(difuse+specular+ambient, 0.0, 1.0);
				}
			}