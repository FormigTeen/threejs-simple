import { Mesh, PlaneGeometry, Scene, ShaderMaterial, Vector2, Vector3 } from 'three';
import Application from '../../Application.js';
import Menu from '../../Objects/SimpleMenu.js';
import OrthographicCamera from '../../Objects/OrthographicCamera.js';
import { getLocalFile  } from '../../Helpers/Helpers.js';

export default class {
    constructor() {
        this._time = 1.0;
        this._provider = new Scene();
        this._provider.name = 'Esferea Ray';
        this._camera = new OrthographicCamera();

        this._shaderPromise = Promise.all([
            getLocalFile('./Scenes/SphereRayScene/Scripts/fragment.glsl')
                .then(_ => this._fragmentScript = _),
            getLocalFile('./Scenes/SphereRayScene/Scripts/vertex.glsl')
                .then(_ => this._vertexScript = _),
        ])

        this._shaderPromise.then(
            () => {
                this._plane = new Mesh(
                    new PlaneGeometry(this.getDimension().x, this.getDimension().y, 1, 1),
                    this.getMaterial()
                );
                this._provider.add(this._plane)
            }
        )
    }

    getDimension() {
        return new Vector2(20.0, 20.0)
    }

    getTimerShader() {
        return 1.0 - Math.abs(this._time - 1.0);
    }

    getMaterial() {
        return new ShaderMaterial({
            uniforms: {
                uCamPos: {
                    type: "vec3", value: new Vector3(0.0, 0.0 , 10.0)
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
        }
        return this._menu;
    }

    onUpdate() {
        return this;
    }

    getUuid() {
        return this._provider.uuid;
    }
}
