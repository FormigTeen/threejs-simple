import { Scene } from 'three';
import Camera from './Objects/Camera.js';
import Application from '../../Application.js';
import Menu from './Objects/Menu.js';
import Ground from './Objects/Ground/Ground.js';

export default class {
    constructor() {
        this._provider = new Scene();
        this._provider.name = 'Malha';
        this._ground = new Ground();

        this._camera = new Camera();
        this._ground.getAsyncProvider().then(() => {
            this._provider.add(this._ground.getProvider())
        })
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
            this._ground.onMenu(this._menu)
        }
        return this._menu;
    }

    onUpdate() {
        this._ground.onUpdate();
        return this;
    }

    getUuid() {
        return this._provider.uuid;
    }
}
