export default class ScenesMenu {
    constructor(aMenu) {
        this._provider = aMenu.getProvider().addFolder(this._title);
        this._provider.open();
        this._title = 'Cenas';
    }

    getProvider() {
        return this._provider;
    }
}
