import '../../src/components/rm-route';
import '../../src/components/rm-router';
import './components/app-header';
import './pages/app-home';
import './pages/app-users';
import './pages/app-user';

const template = document.createElement('template');
// language=html
template.innerHTML = `
    <app-header>
        <a class="link" href="/">Home</a>
        <a class="link" href="/users">Users</a>
    </app-header>
    <rm-router>
        <rm-route exact
                  class="route"
                  pattern="/"
                  element="app-home"></rm-route>
        <rm-route exact
                  class="route"
                  pattern="/users"
                  element="app-users"></rm-route>
        <rm-route class="route"
                  pattern="/users/:id"
                  element="app-user"></rm-route>
    </rm-router>
`;

export class AppRoot extends HTMLElement {
    static get is() {
        return 'app-root';
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this._setActivationListeners(this._getRouteElements(), this._getLinkElements());
    }

    _getRouteElements() {
        return Array.from(this.shadowRoot.querySelectorAll('.route'));
    }

    _getLinkElements() {
        return Array.from(this.shadowRoot.querySelectorAll('.link'));
    }

    _setActivationListeners(routeElements, linkElements) {
        routeElements.forEach((routeElement) => {
            routeElement.addEventListener('activate', (event) => {
                const activeElement = event.target;
                this._onActivation(activeElement, routeElements, linkElements);
            });
        });
    }

    _onActivation(activeElement, routeElements, linkElements) {
        const index = routeElements.indexOf(activeElement);
        const linkToActivate = linkElements[index];

        linkElements.forEach((linkElement) => linkElement.classList.remove('active'));
        if (linkToActivate) {
            linkToActivate.classList.add('active');
        }
    }
}

customElements.define(AppRoot.is, AppRoot);
