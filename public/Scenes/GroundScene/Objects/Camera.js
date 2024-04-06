import { PerspectiveCamera } from 'three';

class Camera {
    constructor() {
        const aspect = window.innerWidth / window.innerHeight;
        this._provider = new PerspectiveCamera(
            70.0,
            aspect,
            0.01,
            1000.0
        );
        this._distance = 100;
        this._provider.position.y = 2.0;
        this._provider.position.z = this._distance;
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
        const aspect = window.innerWidth / window.innerHeight;
        this._provider.position.z = this._distance;
        this._provider.updateProjectionMatrix();
    }

    onMenu(aMenu) {
        this._menu = aMenu;
            this._menu
                .getProvider()
                .add(this, '_distance', 1, 200)
                .name('Distância')
        return aMenu;
    }
}

export default Camera;
