export default class ScenesMenu {
    constructor(aMenu) {
        this._title = 'Cenas';
        this._provider = aMenu.getProvider().addFolder(this._title);
        this._provider.open();
    }

    getProvider() {
        return this._provider;
    }
}
