import { NavigationTrigger } from '../navigation-trigger.interface';
import { Observable } from '../../utils/observable/observable';
import { NavigationLocation } from '../navigation-location.interface';
import { Subscription } from '../../utils/observable/subscription';

export class PopstateNavigationTrigger implements NavigationTrigger {
    private popstateObserver$: Observable<NavigationLocation>;

    constructor() {
        this.popstateObserver$ = new Observable();
        this.listenToPopstate();
    }

    subscribe(callback: any): Subscription {
        return this.popstateObserver$.subscribe(callback);
    }

    private listenToPopstate() {
        window.document.addEventListener('popstate', this.onPopstate.bind(this));
    }

    private onPopstate() {
        this.popstateObserver$.next({
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
        });
    }
}
