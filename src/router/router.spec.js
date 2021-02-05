import { Observable } from '../utils/observable/observable';
import NavigationObserver from '../navigation/navigation-observer';
import { Router } from './router';

class TriggerMock {
    observable$ = new Observable();

    subscribe(callback) {
        return this.observable$.subscribe(callback);
    }

    next(location) {
        this.observable$.next(location);
    }
}

const getNavigationObserver = () => {
    const triggerMock = new TriggerMock();
    const triggers = [triggerMock];
    const navigationLocation = {
        pathname: '',
        search: '',
        hash: '',
    };

    const navigationObserver = new NavigationObserver(
        triggers,
        navigationLocation,
    );

    return [triggerMock, navigationObserver];
};

describe('Router tests', () => {
    test('Check that onNavigation returns location', (done) => {
        const [triggerMock, navigationObserver] = getNavigationObserver();
        const router = new Router(navigationObserver);
        const navigationLocation = {
            pathname: '',
            search: '',
            hash: '',
        };
        triggerMock.next(navigationLocation);
        router.onNavigation((_navigationLocation) => {
            expect(_navigationLocation).toEqual(navigationLocation);
            done();
        });
    });
});
