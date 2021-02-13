import { Route } from '../route/route';
import { RmRoute } from './rm-route';
import { RouterFactory } from '../router/router-factory';

const template = document.createElement('template');
// language=html
template.innerHTML = '<slot id="route-slot"></slot>';

export class RmRouter extends HTMLElement {
    static IS = 'rm-router';

    constructor() {
        super();
        this._createRoot();
    }

    connectedCallback() {
        // Wait for child rm-routes to render
        requestAnimationFrame(() => {
            this._watchNavigation();
        });
    }

    disconnectedCallback() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }

    _createRoot() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    _watchNavigation() {
        this._subscription = RouterFactory.router
            .onNavigation(this._onNavigation.bind(this));
    }

    _onNavigation(navigationLocation) {
        const { pathname } = navigationLocation;
        const routeElements = this._routeElements;
        const nextRouteElement = this._findNextRouteElement(routeElements, pathname);

        if (!nextRouteElement) {
            throw new Error(`No route found for pathname ${pathname}`);
        }

        routeElements.forEach((routeElement) => {
            if (routeElement === nextRouteElement) {
                const route = this._routeElementToRoute(routeElement);
                const params = route.extractParams(navigationLocation.pathname);
                routeElement.activate(navigationLocation, params);
            } else {
                routeElement.deactivate();
            }
        });
    }

    _findNextRouteElement(routeElements, pathname) {
        const nextRouteTuple = routeElements
            .map((routeElement) => [routeElement, this._routeElementToRoute(routeElement)])
            .find(([routeElement, route]) => route.matches(pathname));

        const nextRouteElement = nextRouteTuple ? nextRouteTuple[0] : null;
        return nextRouteElement;
    }

    _routeElementToRoute(routeElement) {
        return new Route(routeElement.pattern, routeElement.exact);
    }

    _isRouteElement(element) {
        return element.nodeName.toLowerCase() === RmRoute.IS;
    }

    get _routeElements() {
        return this.shadowRoot
            .getElementById('route-slot')
            .assignedNodes()
            .filter(this._isRouteElement);
    }
}

customElements.define(RmRouter.IS, RmRouter);
