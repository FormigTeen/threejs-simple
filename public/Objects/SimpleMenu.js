class SimpleMenu {
    constructor(aMenu, aTitle = 'Menu Simples') {
        this._title = aTitle
        this._provider = aMenu.getProvider().addFolder(this._title);
        this._provider.hide();
    }

    getProvider() {
        return this._provider;
    }

    onUnload() {
        this._provider.hide();
    }

    onLoad() {
        this._provider.show()
    }
}

export default SimpleMenu;
