import NavigationObserver from './navigation-observer';
import { NavigationLocation } from './navigation-location.interface';
import { NavigationTrigger } from './navigation-trigger.interface';
import { Subscription } from '../utils/observable/subscription';
import { Observable } from '../utils/observable/observable';

class TriggerMock implements NavigationTrigger {
    private observable$: Observable<NavigationLocation> = new Observable<NavigationLocation>();

    subscribe(callback): Subscription {
        return this.observable$.subscribe(callback);
    }

    next(location: NavigationLocation) {
        this.observable$.next(location);
    }
}

describe('Navigation Observer tests', () => {
    test('Observer emits initial value upon subscription', (done) => {
        const location: NavigationLocation = {
            pathname: 'pathname',
            search: 'search',
            hash: 'hash',
        };
        const navigationObserver = new NavigationObserver([], location);
        let res;
        navigationObserver.onNavigation((val) => res = val);
        setTimeout(() => {
            expect(res).toBe(location);
            done();
        }, 10);
    });

    test('Observer emits value when trigger emits', (done) => {
        const location1: NavigationLocation = {
            pathname: 'pathname1',
            search: 'search1',
            hash: 'hash1',
        };

        const location2: NavigationLocation = {
            pathname: 'pathname2',
            search: 'search2',
            hash: 'hash2',
        };

        const triggerMock = new TriggerMock();
        const navigationObserver = new NavigationObserver([triggerMock], location1);
        let res;
        navigationObserver.onNavigation((val) => res = val);
        triggerMock.next(location2);
        setTimeout(() => {
            expect(res).toBe(location2);
            done();
        }, 10);
    });

    test('Observer shouldn\'t emit value after calling destroy', (done) => {
        const location1: NavigationLocation = {
            pathname: 'pathname1',
            search: 'search1',
            hash: 'hash1',
        };

        const location2: NavigationLocation = {
            pathname: 'pathname2',
            search: 'search2',
            hash: 'hash2',
        };

        const triggerMock = new TriggerMock();
        const navigationObserver = new NavigationObserver([triggerMock], location1);
        let res;
        navigationObserver.onNavigation((val) => res = val);
        navigationObserver.destroy();
        triggerMock.next(location2);
        setTimeout(() => {
            expect(res).toBe(location1);
            done();
        }, 10);
    });

    test('Should throw error if trying to subscribe after destroy', () => {
        const location: NavigationLocation = {
            pathname: 'pathname1',
            search: 'search1',
            hash: 'hash1',
        };

        const navigationObserver = new NavigationObserver([], location);
        navigationObserver.destroy();
        const t = () => navigationObserver.onNavigation(() => {});
        expect(t).toThrow(Error);
    });
});
