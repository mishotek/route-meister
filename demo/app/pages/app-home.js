const template = document.createElement('template');
// language=html
template.innerHTML = `<h1>Home</h1>`;

export class AppHome extends HTMLElement {
    static get is() {
        return 'app-home';
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define(AppHome.is, AppHome);
