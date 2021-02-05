import { Observable } from '../utils/observable/observable';

export default class NavigationObserver {
    constructor(navigationTriggers, navigationLocation) {
        this._navigation$ = new Observable(navigationLocation);

        this._subscriptions = navigationTriggers
            .map((navigationTrigger) => navigationTrigger
                .subscribe(this._onNavigationTrigger.bind(this)));
    }

    onNavigation(callback) {
        if (!this._navigation$) throw new Error('Can\'t call onNavigation after calling destroy');

        return this._navigation$.subscribe(callback);
    }

    destroy() {
        this._subscriptions.forEach((s) => s.unsubscribe());
        this._navigation$ = null;
    }

    _onNavigationTrigger(navigationLocation) {
        this._navigation$.next(navigationLocation);
    }
}
