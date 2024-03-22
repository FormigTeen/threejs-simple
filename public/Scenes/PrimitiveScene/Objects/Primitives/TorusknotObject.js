import { Color, Mesh, MeshBasicMaterial, TetrahedronGeometry, TorusKnotGeometry } from 'three'
import SimpleMenu from '../../../../Objects/SimpleMenu.js'
export default class TorusknotObject {

    constructor() {
        this._radiusProp = 0.5
        this._menu = null
        this._provider = new Mesh(
            new TorusKnotGeometry(this._radiusProp, 0.3, 30, 30),
            new MeshBasicMaterial({
                color: new Color("green"),
                wireframe:true
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
            this._menu = new SimpleMenu(aMenu, "Opções do Toro de Knot")
        }
        return this._menu;
    }
}
