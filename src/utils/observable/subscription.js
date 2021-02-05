export class Subscription {
    constructor(callbacks, callback) {
        this._callbacks = callbacks;
        this._callback = callback;
    }

    unsubscribe() {
        const callbackIndex = this._callbacks
            .findIndex((callback) => callback === this._callback);

        if (callbackIndex === -1) {
            throw new Error('Can\'t unsubscribe twice');
        }

        this._callbacks.splice(callbackIndex, 1);
    }
}
