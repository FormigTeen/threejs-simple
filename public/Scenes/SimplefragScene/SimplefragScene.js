import { Mesh, PlaneGeometry, Scene, ShaderMaterial, Vector2, Vector3 } from 'three';
import Application from '../../Application.js';
import Menu from './../../Objects/SimpleMenu.js';
import OrthographicCamera from '../../Objects/OrthographicCamera.js';
import { getLocalFile  } from '../../Helpers/Helpers.js';

export default class {
    constructor() {
        this._time = 1.0;
        this._targetColor = new Vector3(1.0, 0.0, 0.0);
        this._provider = new Scene();
        this._provider.name = 'Fragmento Simples';
        this._camera = new OrthographicCamera();

      this._modeList = {
        "Euclidiano": 1.0,
        "Simples": 0.0,
        "Manhattan": 2.0,
        "Chebyshev": 3.0,
      }

      this._enableAnimation = false;
      this._selectedMode = Object.keys(this._modeList)[0]

        this._shaderPromise = Promise.all([
            getLocalFile('./Scenes/SimplefragScene/Scripts/fragment.glsl')
                .then(_ => this._fragmentScript = _),
            getLocalFile('./Scenes/SimplefragScene/Scripts/vertex.glsl')
                .then(_ => this._vertexScript = _),
        ])

        this._shaderPromise.then(
            () => {
                this._plane = new Mesh(
                    new PlaneGeometry(this.getDimension().x, this.getDimension().y, 10, 10),
                    this.getMaterial()
                );
                this._provider.add(this._plane)
            }
        )
    }

    getDimension() {
        return new Vector2(5.0, 5.0)
    }

    getTimerShader() {
        return 1.0 - Math.abs(this._time - 1.0);
    }

    getMaterial() {
        return new ShaderMaterial({
            uniforms: {
                uTime: {
                    type: "f", value: this.getTimerShader()
                },
                vTarget: {
                    type: "vec3", value: this._targetColor
                },
                uDim: {
                    type: "vec2", value: this.getDimension()
                },
                fMode: {
                    type: "f", value: this._modeList[this._selectedMode]
                }
            },
            vertexShader: this._vertexScript,
            fragmentShader: this._fragmentScript,
            wireframe: false
        });
    }



    getProvider() {
        return this._provider;
    }

    onLoad(aLoader) {
        this._menu?.getProvider().show();
        if (aLoader instanceof Application) aLoader.setCamera(this._camera);
        return this;
    }

    onUnload() {
        this._menu?.getProvider().hide();
        return this;
    }

    onMenu(aMenu) {
        if (!this._menu) {
            this._menu = new Menu(aMenu, "Opções do Plano");
            this._camera.onMenu(this._menu);
            this._menu
                .getProvider()
                .add(this, '_selectedMode', Object.keys(this._modeList))
                .name('Algoritmo Selecionado')
            this._menu
                .getProvider()
                .add(this, '_enableAnimation')
                .name('Ativar Animação')
        }
        return this._menu;
    }

    onUpdate() {
        this._time = this._time + (this._enableAnimation ? 0.005 : 0.0);
        if ( this._time > 2.0 ) {
            this._targetColor = new Vector3(Math.random(), Math.random(), Math.random());
            this._time = 0;
        }
      this._shaderPromise.then(() => {
        this._plane.material = this.getMaterial();
      })
        return this;
    }

    getUuid() {
        return this._provider.uuid;
    }
}
