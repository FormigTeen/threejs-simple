class Menu {
    constructor(aMenu) {
        this._title = 'Menu Simples';
        this._provider = aMenu.getProvider().addFolder(this._title);

        this._provider.hide();
    }

    getProvider() {
        return this._provider;
    }
}

export default Menu;
