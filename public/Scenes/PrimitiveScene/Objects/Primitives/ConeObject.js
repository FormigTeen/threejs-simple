import {
    Color, ConeGeometry,
    Mesh,
    MeshBasicMaterial,
    TetrahedronGeometry,
} from 'three'
import SimpleMenu from '../../../../Objects/SimpleMenu.js'
export default class ConeObject {

    constructor() {
        this._radiusProp = 2.5
        this._heightProp = 0.5
        this._widthSegments = 50
        this._heightSegments = 30
        this._isOpen = false
        this._menu = null
        this._provider = new Mesh(
            this.getGeometry(),
            new MeshBasicMaterial({
                color: new Color("green"),
                wireframe:true
            })
        );
    }

    getGeometry() {
        return new ConeGeometry(this._radiusProp, this._heightProp, this._widthSegments, this._heightSegments, this._isOpen)
    }

    onChange() {
        this._provider.geometry = this.getGeometry()
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
            this._menu = new SimpleMenu(aMenu, "Opções do Cone")
            this._menu.getProvider().add(this, "_radiusProp", 0.1, 3.5) .name("Comprimento do Raio")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_heightProp", 0.1, 5) .name("Altura do Cone")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_widthSegments", 1, 100)
                .name("Largura dos Segmentos")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_heightSegments", 1, 100)
                .name("Altura dos Segmentos")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_isOpen")
                .name("Cone Aberto?")
                .onChange(() => this.onChange())
        }
        return this._menu;
    }
}
