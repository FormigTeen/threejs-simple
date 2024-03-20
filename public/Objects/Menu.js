import { GUI } from 'lil-gui';

export default class Menu {
    constructor() {
        this._provider = new GUI();
        this._provider.title('Configurações');
        this._provider.open();
    }

    getProvider() {
        return this._provider;
    }
}
