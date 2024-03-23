import { Color, Mesh, MeshBasicMaterial, TetrahedronGeometry, TorusKnotGeometry } from 'three'
import SimpleMenu from '../../../../Objects/SimpleMenu.js'
export default class TorusknotObject {

    constructor() {
        this._menu = null
        this._radiusProp = 2.5
        this._tubeProp = 0.3
        this._radialSegments = 50
        this._tubularSegments = 30
        this._windProp = 5
        this._circleProp = 4

        this._provider = new Mesh(
            this.getGeometry(),
            new MeshBasicMaterial({
                color: new Color("green"),
                wireframe:true
            })
        );
    }

    getGeometry() {
        return new TorusKnotGeometry(this._radiusProp, this._tubeProp, this._tubularSegments, this._radialSegments, this._windProp, this._circleProp);
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
            this._menu = new SimpleMenu(aMenu, "Opções do Toro de Knot")
            this._menu.getProvider().add(this, "_radiusProp", 0.1, 3.5) .name("Comprimento do Raio")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_tubeProp", 0.1, 2.5) .name("Comprimento Raio do Tubo")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_radialSegments", 2, 100, 1)
                .name("Segmentos do Raio")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_tubularSegments", 2, 100, 1)
                .name("Segmentos do Tubo")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_windProp", 1, 100, 1)
                .name("Voltas na Geometria")
                .onChange(() => this.onChange())
            this._menu.getProvider().add(this, "_circleProp", 1, 100, 1)
                .name("Ciclos na Geometria")
                .onChange(() => this.onChange())
        }
        return this._menu;
    }
}
