import { Subscription } from './subscription';

export class Observable<Value> {
    private callbacks: Array<any> = [];

    constructor(private value?: Value) {}

    subscribe(callback): Subscription {
        if (typeof callback !== 'function') {
            throw new TypeError('callback must be a function');
        }

        if (typeof this.value !== 'undefined') {
            callback(this.value);
        }

        this.callbacks.push(callback);

        return new Subscription(this.callbacks, callback);
    }

    next(value: Value) {
        this.value = value;
        this.callbacks.forEach((callback) => callback(value));
    }
}
