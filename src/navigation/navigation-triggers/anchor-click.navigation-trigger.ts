import { NavigationTrigger } from '../navigation-trigger.interface';
import { Observable } from '../../utils/observable/observable';
import { NavigationLocation } from '../navigation-location.interface';
import { Subscription } from '../../utils/observable/subscription';

export class AnchorClickNavigationTrigger implements NavigationTrigger {
    private clickObserver$: Observable<NavigationLocation>;

    constructor() {
        this.clickObserver$ = new Observable();
        this.listenToClick();
    }

    subscribe(callback: any): Subscription {
        return this.clickObserver$.subscribe(callback);
    }

    private listenToClick() {
        window.document.addEventListener('click', this.onClick.bind(this));
    }

    // Source Vaadin router click trigger
    private onClick(event) {
        // ignore the click if the default action is prevented
        if (event.defaultPrevented) {
            return;
        }

        // ignore the click if not with the primary mouse button
        if (event.button !== 0) {
            return;
        }

        // ignore the click if a modifier key is pressed
        if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
            return;
        }

        // find the <a> element that the click is at (or within)
        let anchor = event.target;
        const path = event.composedPath
            ? event.composedPath()
            : (event.path || []);

        for (let i = 0; i < path.length; i++) {
            const target = path[i];
            if (target.nodeName && target.nodeName.toLowerCase() === 'a') {
                anchor = target;
                break;
            }
        }

        while (anchor && anchor.nodeName.toLowerCase() !== 'a') {
            anchor = anchor.parentNode;
        }

        // ignore the click if not at an <a> element
        if (!anchor || anchor.nodeName.toLowerCase() !== 'a') {
            return;
        }

        // ignore the click if the <a> element has a non-default target
        if (anchor.target && anchor.target.toLowerCase() !== '_self') {
            return;
        }

        // ignore the click if the <a> element has the 'download' attribute
        if (anchor.hasAttribute('download')) {
            return;
        }

        // ignore the click if the target URL is a fragment on the current page
        if (anchor.pathname === window.location.pathname && anchor.hash !== '') {
            return;
        }

        // ignore the click if the target is external to the app
        // In IE11 HTMLAnchorElement does not have the `origin` property
        const origin = anchor.origin || this.getAnchorOrigin(anchor);
        if (origin !== window.location.origin) {
            return;
        }

        // if none of the above, convert the click into a navigation event
        const { pathname, search, hash } = anchor;
        event.preventDefault();
        this.clickObserver$.next({ pathname, search, hash });
    }

    private getAnchorOrigin(anchor) {
        // IE11: on HTTP and HTTPS the default port is not included into
        // window.location.origin, so won't include it here either.
        const { port, protocol } = anchor;
        const defaultHttp = protocol === 'http:' && port === '80';
        const defaultHttps = protocol === 'https:' && port === '443';
        const host = (defaultHttp || defaultHttps)
            ? anchor.hostname // does not include the port number (e.g. www.example.org)
            : anchor.host; // does include the port number (e.g. www.example.org:80)
        return `${protocol}//${host}`;
    }
}
