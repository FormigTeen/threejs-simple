import {
    CapsuleGeometry,
    Color,
    Mesh,
    MeshBasicMaterial,
    TetrahedronGeometry,
} from 'three'
import SimpleMenu from '../../../../Objects/SimpleMenu.js'
export default class CapsuleObject {

    constructor() {
        this._radiusProp = 0.5
        this._lengthProp = 0.5
        this._capSegments = 50
        this._radialSegments = 30
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
        return new CapsuleGeometry(this._radiusProp, this._lengthProp, this._capSegments, this._radialSegments);
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
            this._menu = new SimpleMenu(aMenu, "Opções da Cápsula")
            this._menu.getProvider().add(this, "_radiusProp", 0.1, 3.5) .name("Comprimento do Raio")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_lengthProp", 0.1, 3) .name("Altura da Cápsula")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_capSegments", 1, 100)
                .name("Quantidade de Curvas")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_radialSegments", 5, 100)
                .name("Quantidade de Segmentos")
                .onChange(() => this.onChange())
        }
        return this._menu;
    }
}
