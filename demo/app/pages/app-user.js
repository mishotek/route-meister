const template = document.createElement('template');
// language=html
template.innerHTML = `<h1>User</h1>`;

export class AppUser extends HTMLElement {
    static get is() {
        return 'app-user';
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define(AppUser.is, AppUser);
