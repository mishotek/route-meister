const template = document.createElement('template');
// language=html
template.innerHTML = '';

export class RmRoute extends HTMLElement {
    static IS = 'rm-route';

    constructor() {
        super();
        this._createRoot();
    }

    static get observedAttributes() {
        return [
            'pattern',
            'exact',
        ];
    }

    get pattern() {
        return this.getAttribute('pattern');
    }

    set pattern(pattern) {
        this.setAttribute('pattern', pattern);
    }

    get exact() {
        return this.hasAttribute('exact');
    }

    set exact(exact) {
        if (exact) {
            this.setAttribute('exact', '');
        } else {
            this.removeAttribute('exact');
        }
    }

    get element() {
        return this.getAttribute('element');
    }

    set element(nodeName) {
        return this.setAttribute('element', nodeName);
    }

    activate(navigationLocation, params) {
        const { element } = this;
        if (typeof element !== 'string') {
            throw new Error(`element attribute must be a nodeName of the element that will be rendered on navigation (for example app-home), but now is ${element}`);
        }

        if (!this._node) {
            this._node = document.createElement(element);
            this._node.setAttribute('route-pattern', this.pattern);
            this.shadowRoot.appendChild(this._node);
        }

        if (typeof this._node.routeChangedCallback === 'function') {
            this._node.routeChangedCallback(navigationLocation, params);
        }

        this._notifyActivation(this._node);
    }

    deactivate() {
        if (!this._node) return;

        this.shadowRoot.innerHTML = '';
        this._node = null;
        this._notifyDeactivation();
    }

    _createRoot() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    _notifyActivation(node) {
        this.dispatchEvent(new CustomEvent('activate', {
            detail: { node },
        }));
    }

    _notifyDeactivation() {
        this.dispatchEvent(new CustomEvent('deactivate'));
    }
}

customElements.define(RmRoute.IS, RmRoute);
