const template = document.createElement('template');
// language=html
template.innerHTML = `<h1>About</h1>`;

export class AppAbout extends HTMLElement {
    static get is() {
        return 'app-about';
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define(AppAbout.is, AppAbout);
