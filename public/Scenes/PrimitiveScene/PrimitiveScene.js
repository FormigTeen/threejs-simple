import {
    Color,
    Scene,
} from 'three'
import OrthographicCamera from '../../Objects/OrthographicCamera.js'
import SimpleMenu from '../../Objects/SimpleMenu.js'
import TetrahedronObject from './Objects/Primitives/TetrahedronObject.js'
import SphereObject from './Objects/Primitives/SphereObject.js'
import TorusObject from './Objects/Primitives/TorusObject.js'
import TorusknotObject from './Objects/Primitives/TorusknotObject.js'
import CapsuleObject from './Objects/Primitives/CapsuleObject.js'
import ConeObject from './Objects/Primitives/ConeObject.js'

export default class PrimitiveScene {
    constructor() {
        /**
         * @type {Scene}
         * @private
         */
        this._provider = new Scene();
        this._provider.name = 'Primitivas 3D';

        this._currentTime = 0;
        /**
         * @type {OrthographicCamera} _camera
         * @private
         */
        this._camera = new OrthographicCamera();

        /**
         *
         * @type {number} _radiusProp
         * @private
         */
        this._radiusProp = 0.5

        this._sceneObjects = {
            "Tetraedro": new TetrahedronObject(),
            "Toro Knot" : new TorusknotObject(),
            "Toro": new TorusObject(),
            "Esfera": new SphereObject(),
            "Cone": new ConeObject(),
            "Capsula": new CapsuleObject(),
        }

        this._selectedObject = Object.keys(this._sceneObjects)[0]

        Object.values(this._sceneObjects)
            .map(_ => this._provider.add(_.getProvider()))

    }

    getProvider() {
        return this._provider;
    }

    /**
     *
     * @param {Application} aLoader
     * @returns {ColorScene}
     */
    onLoad(aLoader) {
        this._menu?.getProvider().show();
        aLoader.setCamera(this._camera);
        aLoader.getProvider().setClearColor(new Color("black"))
        return this;
    }

    /**
     * @param {Application} aLoader
     * @returns {ColorScene}
     */
    onUnload(aLoader) {
        aLoader.getProvider().setClearColor(this._defaultColor)
        this._menu?.getProvider().hide();
        return this;
    }

    onMenu(aMenu) {
        if (!this._menu) {
            this._menu = new SimpleMenu(aMenu, "Menu das Primitivas");
            this._camera.onMenu(this._menu);
            this._menu
                .getProvider()
                .add(this, '_selectedObject', Object.keys(this._sceneObjects))
                .name('Objeto Selecionado')
            Object.values(this._sceneObjects)
                .filter(_ => !!_['onMenu'])
                .map(_ => _.onMenu(this._menu))
        }
        return this._menu;
    }

    /**
     * @param {Application} aLoader
     * @returns {ColorScene}
     */
    onUpdate(aLoader) {
        this._currentTime += 1 / 20
        if ( this._currentTime > 1 ) {
            this._currentTime = 0
        }
        Object.entries(this._sceneObjects)
            .map(([aKey, anObject]) => {
                if (this._selectedObject == aKey && !anObject.isLoaded()) {
                   anObject.onLoad()
                }
                if (this._selectedObject != aKey && anObject.isLoaded()) {
                    anObject.onUnload()
                }
                return [aKey, anObject]
            })
            .filter(([aKey, _]) => this._selectedObject == aKey)
            .map(([_, anObject]) => anObject.onUpdate())
        return this;
    }


    getUuid() {
        return this._provider.uuid;
    }

}
