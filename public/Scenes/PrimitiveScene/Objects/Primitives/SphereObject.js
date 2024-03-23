import { Color, Mesh, MeshBasicMaterial, SphereGeometry, TetrahedronGeometry } from 'three'
import SimpleMenu from '../../../../Objects/SimpleMenu.js'
export default class SphereObject {

    constructor() {
        /**
         *
         * @type {SimpleMenu}
         * @private
         */
        this._menu = null
        this._radiusProp = 2.5
        this._widthSegments = 50
        this._heightSegments = 30

        this._provider = new Mesh(
            this.getGeometry(),
            new MeshBasicMaterial({
                color: new Color("green"),
                wireframe:true
            })
        );
    }

    onChange() {
        this._provider.geometry = this.getGeometry()
    }

    getGeometry() {
        return new SphereGeometry(this._radiusProp, this._widthSegments, this._heightSegments);
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
            this._menu = new SimpleMenu(aMenu, "Opções da Esfera")
            this._menu.getProvider().add(this, "_radiusProp", 0.1, 2.5) .name("Comprimento do Raio")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_widthSegments", 1, 100)
                .name("Largura dos Segmentos")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_heightSegments", 1, 100)
                .name("Altura dos Segmentos")
                .onChange(() => this.onChange())
        }
        return this._menu;
    }
}
