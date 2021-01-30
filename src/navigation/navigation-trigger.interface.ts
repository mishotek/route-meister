import {Subscription} from "../utils/observable/subscription";

export interface NavigationTrigger {
    subscribe: (callback: any) => Subscription
}
