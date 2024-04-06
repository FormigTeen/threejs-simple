import { Mesh, PlaneGeometry, Scene, ShaderMaterial, Vector2 } from 'three';
import Application from '../../Application.js';
import Menu from './Objects/Menu.js';
import OrthographicCamera from '../../Objects/OrthographicCamera.js';
import { getLocalFile  } from '../../Helpers/Helpers.js';

export default class {
    constructor() {
        this._provider = new Scene();
        this._provider.name = 'Fragmento Simples';
        this._camera = new OrthographicCamera();

      this._modeList = {
        "Euclidiano": 1.0,
        "Simples": 0.0,
        "Manhattan": 2.0,
        "Chebyshev": 3.0,
      }

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

    getMaterial() {
        return new ShaderMaterial({
            uniforms: {
                uTime: {
                    type: "f", value: 0.0
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
            this._menu = new Menu(aMenu);
            this._camera.onMenu(this._menu);
            this._menu
                .getProvider()
                .add(this, '_selectedMode', Object.keys(this._modeList))
                .name('Algoritmo Selecionado')
        }
        return this._menu;
    }

    onUpdate() {
      this._shaderPromise.then(() => {
        this._plane.material = this.getMaterial();
      })
        return this;
    }

    getUuid() {
        return this._provider.uuid;
    }
}
