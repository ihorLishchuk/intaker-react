import Subscriber from "./Subscriber.ts";

class FavoriteService extends Subscriber {
    private _showFavorites = false;

    get value() {
        return this._showFavorites;
    }

    toggle() {
        this._showFavorites = !this._showFavorites;
        this.notifySubscribers();
    }

    setValue(value: boolean) {
        this._showFavorites = value;
        this.notifySubscribers();
    }
}

export default new FavoriteService();
