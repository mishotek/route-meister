const template = document.createElement('template');
// language=html
template.innerHTML = `
    <style>
        .page {
            padding: 0 48px;
        }
    </style>
    
    <div class="page">
        <h1>Home</h1>
        <p>Route: <span id="pattern"></span></p>
    </div>
`;

export class AppHome extends HTMLElement {
    static get is() {
        return 'app-home';
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.getElementById('pattern')
            .innerHTML = this.getAttribute('route-pattern');
    }

    routeChangedCallback(navigationLocation) {
        console.log('navigationLocation', navigationLocation);
    }
}

customElements.define(AppHome.is, AppHome);
