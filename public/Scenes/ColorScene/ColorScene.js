import { Color, Scene } from 'three'
import Camera from './Objects/Camera.js';
import Menu from './Objects/Menu.js';
import { toColor } from '../../Helpers/Vector.js'
import { toVector } from '../../Helpers/Color.js'

export default class ColorScene {
    constructor() {
        this._stepTime = 1 / 50;
        /**
         * @type {boolean} _hasAnimation
         * @private
         */
        this._hasAnimation = false
        /**
         * @type {boolean} _isSmooth
         * @private
         */
        this._isSmooth = false
        this._currentTime = 0
        this._provider = new Scene();
        this._provider.name = 'Mudando de Cor';
        this._camera = new Camera();
        /**
         * @type {Color} _defaultColor
         * @private
         */
        this._defaultColor = new Color(0x000000);

        /**
         * @type {Color} _targetColor
         * @private
         */
        this._targetColor = this._defaultColor

        /**
         * @type {Color} _currentColor
         * @private
         */
        this._currentColor = this._defaultColor

        /**
         * @type {Color} _lastColor
         * @private
         */
        this._lastColor = this._defaultColor
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
        aLoader.getProvider().setClearColor(this._defaultColor)
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
            this._menu = new Menu(aMenu);
            this._menu
                .getProvider()
                .add(this, '_hasAnimation')
                .name('Ativar Animação')
            this._menu
                .getProvider()
                .add(this, '_isSmooth')
                .name('Modo Suave')
            this._menu
                .getProvider()
                .add(this, '_stepTime', 1 / 1000, 1 / 15 )
                .name('Velocidade')
            this._camera.onMenu(this._menu);
        }
        return this._menu;
    }

    /**
     * @param {Application} aLoader
     * @returns {ColorScene}
     */
    onUpdate(aLoader) {
        if ( !this._hasAnimation ) {
            aLoader.getProvider().setClearColor(this._defaultColor)
            return this;
        }
        this._currentTime += this._stepTime
        if ( this._currentTime > 1 ) {
            this._lastColor = this._currentColor
            this._currentColor = this._targetColor;
            this._targetColor = new Color(Math.random(), Math.random(), Math.random());
            aLoader.getProvider().setClearColor(this._currentColor)
            this._currentTime = 0;
        }

        if ( this._currentTime <= 1 && this._isSmooth ) {
            this._currentColor = toColor(
                toVector(this._lastColor)
                    .add(
                        toVector(this._targetColor).sub(toVector(this._lastColor)).multiplyScalar(this._currentTime)
                    )
            )
            aLoader.getProvider().setClearColor(this._currentColor)
        }

        return this;
    }

    getUuid() {
        return this._provider.uuid;
    }
}
