import NavigationObserver from './navigation-observer';
import { AnchorClickNavigationTrigger } from './navigation-triggers/anchor-click.navigation-trigger';
import { PopstateNavigationTrigger } from './navigation-triggers/popstate.navigation-trigger';

export class NavigationObserverFactory {
    static get navigationObserver() {
        if (!NavigationObserverFactory.INSTANCE) {
            NavigationObserverFactory.INSTANCE = NavigationObserverFactory._makeInstance();
        }
        return NavigationObserverFactory.INSTANCE;
    }

    static _makeInstance() {
        const triggers = [
            new AnchorClickNavigationTrigger(),
            new PopstateNavigationTrigger(),
        ];
        const navigationLocation = {
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
