import { OrthographicCamera as BaseOrthographicCamera } from 'three'
import { getAspect } from '../Helpers/Helpers.js'

export default class OrthographicCamera {
    constructor() {
        this._size = 10.0
        this._provider = new BaseOrthographicCamera(
            (this._size * getAspect()) / -2.0,
            (this._size * getAspect()) / 2.0,
            this._size / 2.0,
            this._size / -2.0,
            -5.0,
            5.0,
        );
        this._provider.updateProjectionMatrix();
        window.addEventListener('resize', () => this.onResize(), false);
    }

    getProvider() {
        return this._provider;
    }

    onResize() {
        this.onUpdate();
        this._provider.updateProjectionMatrix();
    }

    onUpdate() {
        this._provider.left = (this._size * getAspect()) / -2.0;
        this._provider.right = (this._size * getAspect()) / 2.0;
        this._provider.updateProjectionMatrix();
    }

    onMenu(aMenu) {
        return aMenu;
    }
}

