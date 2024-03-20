import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from 'three'
import Camera from './Objects/Camera.js';
import Application from '../../Application.js';
import Menu from './Objects/Menu.js';
import { OrbitControls } from '../../Vendors/OrbitControls.js'
import { getCanvas } from '../../Helpers.js'

export default class CubeScene {
    constructor() {
        this._provider = new Scene();
        this._provider.name = 'Cena do Cubo';
        this._camera = new Camera();

        this._controls = new OrbitControls(this._camera.getProvider(), getCanvas())

        this._geometry = new BoxGeometry()
        this._material = new MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
        })
        this._cube = new Mesh(this._geometry, this._material)

        this.getProvider().add(this._cube)
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
        }
        return this._menu;
    }

    onUpdate() {
        this._cube.rotateX(0.01)
        this._cube.rotateY(0.01)
        this._controls.update()
        return this;
    }

    getUuid() {
        return this._provider.uuid;
    }
}
