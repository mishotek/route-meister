import { Observable } from '../../utils/observable/observable';

export class PopstateNavigationTrigger {
    constructor() {
        this._popstateObserver$ = new Observable();
        this._listenToPopstate();
    }

    subscribe(callback) {
        return this._popstateObserver$.subscribe(callback);
    }

    _listenToPopstate() {
        window.addEventListener('popstate', this._onPopstate.bind(this));
    }

    _onPopstate() {
        this._popstateObserver$.next({
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
        });
    }
}
