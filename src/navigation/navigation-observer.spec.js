import NavigationObserver from './navigation-observer';
import { Observable } from '../utils/observable/observable';

class TriggerMock {
    observable$ = new Observable();

    subscribe(callback) {
        return this.observable$.subscribe(callback);
    }

    next(location) {
        this.observable$.next(location);
    }
}

describe('Navigation Observer tests', () => {
    test('Observer emits initial value upon subscription', (done) => {
        const location = {
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
        const location1 = {
            pathname: 'pathname1',
            search: 'search1',
            hash: 'hash1',
        };

        const location2 = {
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
        const location1 = {
            pathname: 'pathname1',
            search: 'search1',
            hash: 'hash1',
        };

        const location2 = {
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
        const location = {
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
