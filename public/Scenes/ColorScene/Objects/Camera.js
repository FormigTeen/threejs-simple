import { OrthographicCamera } from 'three'
import { getAspect } from '../../../Helpers/Helpers.js'

class Camera {
    constructor() {
        this._size = 10.0
        this._provider = new OrthographicCamera(
            (this._size * getAspect()) / -2.0,
            (this._size * getAspect()) / 2.0,
            this._size / 2.0,
            this._size / -2.0,
            -1.0,
            1.0,
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

export default Camera;
