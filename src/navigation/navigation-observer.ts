import { NavigationTrigger } from './navigation-trigger.interface';
import { NavigationLocation } from './navigation-location.interface';
import { Observable } from '../utils/observable/observable';
import { Subscription } from '../utils/observable/subscription';

export default class NavigationObserver {
    private navigation$: Observable<NavigationLocation>;

    private subscriptions: Array<Subscription>;

    constructor(navigationTriggers: Array<NavigationTrigger>, location: NavigationLocation) {
        this.navigation$ = new Observable(location);

        this.subscriptions = navigationTriggers
            .map((navigationTrigger) => navigationTrigger
                .subscribe(this.onNavigationTrigger.bind(this)));
    }

    public onNavigation(callback): Subscription {
        if (!this.navigation$) throw new Error('Can\'t call onNavigation after calling destroy');

        return this.navigation$.subscribe(callback);
    }

    public destroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
        this.navigation$ = null;
    }

    private onNavigationTrigger(location: NavigationLocation) {
        this.navigation$.next(location);
    }
}
