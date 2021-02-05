import { Observable } from './observable';

describe('Observable tests', () => {
    test('Should throw error if subscribe argument is not a function', () => {
        const observable = new Observable();
        const t = () => observable.subscribe(42);
        expect(t).toThrow(TypeError);
    });

    test('Should do nothing when subscribing to an empty observable', (done) => {
        const observable = new Observable();
        let callTimes = 0;
        observable.subscribe(() => callTimes++);
        setTimeout(() => {
            expect(callTimes).toBe(0);
            done();
        }, 10);
    });

    test('Should get value when subscribing to non empty observable', (done) => {
        const observable = new Observable('some-value');
        let val = null;
        observable.subscribe((next) => val = next);
        setTimeout(() => {
            expect(val).toBe('some-value');
            done();
        }, 10);
    });

    test('Should update value after calling next', (done) => {
        const observable = new Observable();
        let val = null;
        observable.subscribe((next) => val = next);
        observable.next('some-value');
        setTimeout(() => {
            expect(val).toBe('some-value');
            done();
        }, 10);
    });

    test('Should not update value after unsubscribing', (done) => {
        const observable = new Observable();
        let val = null;
        const subscription = observable.subscribe((next) => val = next);
        subscription.unsubscribe();
        observable.next('some-value');
        setTimeout(() => {
            expect(val).toBe(null);
            done();
        }, 10);
    });
});
