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
        this._currentScene = '';
        this._backupScene = '';
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
        if (!this._currentScene) {
            this._currentScene = aScene.getUuid();
            this.onChangeScene();
            this._backupScene = this._currentScene;
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
            [key]: (_ => aObject.onUpdate(this, _)),
        };
        return this;
    }

    onUpdate(aClock) {
        Object.keys(this._updatesStack)
            .filter(_ => _ == this.getCurrentScene()?.getUuid())
            .map(_ => this._updatesStack[_])
            .forEach(_ => _(aClock));
        this._scene = this._scenes.find(_ => _.getUuid() === this._currentScene);
        this.onRender();
    }

    onMenu(aMenu) {
        if (!this._sceneOption) {
            this._sceneOption = aMenu.getProvider()
                .add(
                    this,
                    '_currentScene',
                    this._scenes
                        .map(_ => [_.getProvider().name, _.getUuid()])
                        .reduce((aDictionary, [aName, aId]) => ({...aDictionary, [aName]: aId}), {})
                ).onChange(() => this.onChangeScene())
                .name('Cena Atual')
        } else {
            this._sceneOption.options(this._scenes.map(_ => _.getProvider().name));
        }
        return aMenu;
    }

    onChangeScene() {
        this._scenes.find(_ => _.getUuid() === this._backupScene)?.onUnload(this);
        this._backupScene = this._currentScene;
        this.getCurrentScene()?.onLoad(this);
    }

    getCurrentScene() {
        return this._scenes.find(_ => _.getUuid() === this._currentScene);
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
