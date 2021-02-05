import { Subscription } from './subscription';

export class Observable {
    _callbacks = [];

    constructor(value) {
        this._value = value;
    }

    subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new TypeError('callback must be a function');
        }

        if (typeof this._value !== 'undefined') {
            callback(this._value);
        }

        this._callbacks.push(callback);
        return new Subscription(this._callbacks, callback);
    }

    next(value) {
        this._value = value;
        this._callbacks.forEach((callback) => callback(value));
    }
}
