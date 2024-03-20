import { OrthographicCamera } from 'three';

class Camera {
    constructor() {
        const aspect = window.innerWidth / window.innerHeight;
        this._provider = new OrthographicCamera(
            (this._size * aspect) / -2.0,
            (this._size * aspect) / 2.0,
            this._size / 2.0,
            this._size / -2.0,
            -10000,
            10000,
        );
        this._provider.updateProjectionMatrix();
        window.addEventListener('resize', () => this.onResize(), false);
        this._size = 50.0;
    }

    getProvider() {
        return this._provider;
    }

    onResize() {
        this.onUpdate();
        this._provider.updateProjectionMatrix();
    }

    onUpdate() {
        const aspect = window.innerWidth / window.innerHeight;
        this._provider.left = (this._size * aspect) / -2.0;
        this._provider.right = (this._size * aspect) / 2.0;
        this._provider.updateProjectionMatrix();
    }

    onMenu(aMenu) {
        return aMenu;
    }
}

export default Camera;
