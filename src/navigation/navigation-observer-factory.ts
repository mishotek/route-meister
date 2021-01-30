import NavigationObserver from './navigation-observer';
import { NavigationTrigger } from './navigation-trigger.interface';
import { AnchorClickNavigationTrigger } from './navigation-triggers/anchor-click.navigation-trigger';
import { NavigationLocation } from './navigation-location.interface';
import { PopstateNavigationTrigger } from './navigation-triggers/popstate.navigation-trigger';

export class NavigationObserverFactory {
    static INSTANCE: NavigationObserver;

    static get navigationObserver(): NavigationObserver {
        if (!NavigationObserverFactory.INSTANCE) {
            NavigationObserverFactory.INSTANCE = NavigationObserverFactory.makeInstance();
        }
        return NavigationObserverFactory.INSTANCE;
    }

    private static makeInstance(): NavigationObserver {
        const triggers: Array<NavigationTrigger> = [
            new AnchorClickNavigationTrigger(),
            new PopstateNavigationTrigger(),
        ];
        const navigationLocation: NavigationLocation = {
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
        };

        return new NavigationObserver(
            triggers,
            navigationLocation,
        );
    }
}
