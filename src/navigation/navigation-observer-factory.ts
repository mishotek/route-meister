import NavigationObserver from "./navigation-observer";

export class NavigationObserverFactory {
    getNavigationObserver(): NavigationObserver {
        return new NavigationObserver([], null);
    }
}