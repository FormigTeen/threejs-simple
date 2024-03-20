import { Scene } from 'three';
import Camera from './Objects/Camera.js';
import Application from '../../Application.js';
import Menu from './Objects/Menu.js';

export default class StartScene {
    constructor() {
        this._provider = new Scene();
        this._provider.name = 'Cena Simples';

        this._camera = new Camera();
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
        return this;
    }

    getUuid() {
        return this._provider.uuid;
    }
}
