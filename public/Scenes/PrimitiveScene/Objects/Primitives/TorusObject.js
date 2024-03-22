import { Color, Mesh, MeshBasicMaterial, SphereGeometry, TetrahedronGeometry, TorusGeometry } from 'three'
import SimpleMenu from '../../../../Objects/SimpleMenu.js'
export default class TorusObject {

    constructor() {
        this._menu = null
        this._radiusProp = 0.5
        this._provider = new Mesh(
            new TorusGeometry(this._radiusProp, 0.3, 30, 30),
            new MeshBasicMaterial({
                color: new Color("green"),
                wireframe: true
            })
        );
    }

    getGeometry() {
        return new TetrahedronGeometry(this._radiusProp)
    }

    getProvider() {
        return this._provider
    }

    onUnload() {
        this._menu?.onUnload()
        this.getProvider().visible = false;
    }

    onLoad() {
        this._menu?.onLoad()
        this.getProvider().visible = true;
    }

    isLoaded() {
        return this.getProvider().visible;
    }

    onUpdate() {
        this.getProvider().rotateY(0.01);
        this.getProvider().rotateX(0.01);
        this.getProvider().updateMatrix()
        if ( this.isLoaded() ) {
            this._menu?.onLoad()
        }
        return this;
    }

    onMenu(aMenu) {
        if (!this._menu) {
            this._menu = new SimpleMenu(aMenu, "Opções do Toro")
        }
        return this._menu;
    }
}
