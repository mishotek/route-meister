export class Router {
    constructor(navigationObserver) {
        this._navigationObserver = navigationObserver;
        this._subscriptions = [];

        this._updateBrowserHistoryOnNavigation(navigationObserver);
    }

    onNavigation(callback) {
        return this._navigationObserver.onNavigation(callback);
    }

    _updateBrowserHistoryOnNavigation(navigationObserver) {
        const subscription = navigationObserver.onNavigation(({ pathname, search, hash }) => {
            this._updateBrowserHistory(pathname, search, hash);
        });

        this._subscriptions.push(subscription);
    }

    _updateBrowserHistory(pathname, search, hash) {
        const historyShouldUpdate = window.location.pathname !== pathname
            || window.location.search !== search
            || window.location.hash !== hash;

        if (historyShouldUpdate) {
            window.history.pushState(null, document.title, pathname + search + hash);
        }
    }
}
