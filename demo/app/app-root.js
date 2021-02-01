const template = document.createElement('template');
// language=html
template.innerHTML = `
    <p>Hi</p>
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
}

customElements.define(AppRoot.is, AppRoot);
