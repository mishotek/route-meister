export class Subscription {
    constructor(private callbacks: Array<any>, private callback: any) {}

    unsubscribe() {
        const callbackIndex = this.callbacks
            .findIndex((callback) => callback === this.callback);

        if (callbackIndex === -1) {
            throw new Error('Can\'t unsubscribe twice');
        }

        this.callbacks.splice(callbackIndex, 1);
    }
}