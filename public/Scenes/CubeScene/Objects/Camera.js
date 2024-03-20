import { PerspectiveCamera } from 'three'

class Camera {
    constructor() {
        const aspect = window.innerWidth / window.innerHeight;
        this._provider = new PerspectiveCamera(
            75,
            aspect,
            0.1,
            100
        )
        this._provider.updateProjectionMatrix();
        this._provider.position.z = 2
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
