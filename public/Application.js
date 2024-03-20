import {  WebGLRenderer } from 'three';
import { isHasUpdate } from './Interfaces/IHasUpdate.js';
import { isHasMenu } from './Interfaces/IHasMenu.js';
import Menu from './Objects/Menu.js';

export default class Application {
    constructor() {
        this._provider = new WebGLRenderer();
        //this._stats = Stats()
        //document.body.appendChild(this._stats.dom)
        this._provider.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._provider.domElement);
        window.addEventListener('resize', () => this.onResize(), false);

        this._scenes = [];
        this._controls = {
            Cena: '',
            BackupCena: '',
        };
        this._updatesStack = {};
    }

    onBoot() {
        this.onRender();
        requestAnimationFrame((_) => this.onAnimate(_));
    }

    onAnimate(clock) {
        this.onUpdate(clock);
        requestAnimationFrame((_) => this.onAnimate(_));
    }

    onResize() {
        this._provider.setSize(window.innerWidth, window.innerHeight);
        this.onRender();
    }

    addScene(aScene) {
        if (isHasMenu(aScene) && this._menu) {
            aScene.onMenu(this._menu);
        }
        this._scenes = [...this._scenes, aScene];
        if (!this._controls.Cena) {
            this._controls.Cena = aScene.getProvider().name;
            this.onChangeScene();
            this._controls.BackupCena = this._controls.Cena;
        }
        if (isHasUpdate(aScene)) {
            this.registerUpdate(aScene);
        }
        return this;
    }

    setCamera(aCamera) {
        this._camera = aCamera;
        return this;
    }

    onRender() {
        if (this._scene && this._camera) {
            this.getProvider().render(this._scene.getProvider(), this._camera.getProvider());
        }
        return this;
    }

    getProvider() {
        return this._provider;
    }

    registerUpdate(aObject) {
        const key = aObject.getUuid();
        this._updatesStack = {
            ...this._updatesStack,
            [key]: (_ => aObject.onUpdate(_)),
        };
        return this;
    }

    onUpdate(aClock) {
        Object.keys(this._updatesStack)
            .map(_ => this._updatesStack[_])
            .forEach(_ => _( {getApplication: () => this, getClock: () => aClock} ));
        this._scene = this._scenes.find(_ => _.getProvider().name === this._controls['Cena']);
        this.onRender();
    }

    onMenu(aMenu) {
        if (!this._sceneOption) {
            this._sceneOption = aMenu.getProvider().add(this._controls, 'Cena', this._scenes.map(_ => _.getProvider().name)).onChange(() => this.onChangeScene());
        } else {
            this._sceneOption.options(this._scenes.map(_ => _.getProvider().name));
        }
        return aMenu;
    }

    onChangeScene() {
        this._scenes.find(_ => _.getProvider().name === this._controls['BackupCena'])?.onUnload(this);
        this._controls.BackupCena = this._controls.Cena;
        this._scenes.find(_ => _.getProvider().name === this._controls['Cena'])?.onLoad(this);
    }

    useMenu() {
        if (!this._menu) this._menu = new Menu();
        return this;
    }

    onFuncMenu(aCallable) {
        if (this._menu) aCallable(this._menu, this);
        return this;
    }
}
