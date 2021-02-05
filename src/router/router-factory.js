import { NavigationObserverFactory } from '../navigation/navigation-observer-factory';
import { Router } from './router';

export class RouterFactory {
    static get router() {
        if (!RouterFactory.INSTANCE) {
            RouterFactory.INSTANCE = RouterFactory._makeInstance();
        }
        return RouterFactory.INSTANCE;
    }

    static _makeInstance() {
        const { navigationObserver } = NavigationObserverFactory;
        return new Router(navigationObserver);
    }
}
