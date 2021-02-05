import { Subscription } from './subscription';

describe('Subscription tests', () => {
    test('Should remove callback from callbacks', () => {
        const callback1 = () => {};
        const callback2 = () => {};
        const callbacks = [callback1, callback2];
        const subscription = new Subscription(callbacks, callback1);
        subscription.unsubscribe();
        expect(callbacks.includes(callback1)).toBeFalsy();
    });
});

describe('Subscription tests', () => {
    test('Should throw error when trying to remove unregistered callback', () => {
        const callback1 = () => {};
        const callback2 = () => {};
        const callbacks = [callback1];
        const subscription = new Subscription(callbacks, callback2);
        const t = () => subscription.unsubscribe();
        expect(t).toThrow(Error);
    });
});

describe('Subscription tests', () => {
    test('Should throw error when trying to unsubscribe twice', () => {
        const callback1 = () => {};
        const callback2 = () => {};
        const callbacks = [callback1, callback2];
        const subscription = new Subscription(callbacks, callback1);
        subscription.unsubscribe();
        const t = () => subscription.unsubscribe();
        expect(t).toThrow(Error);
    });
});
