import '../../src/components/rm-route';
import '../../src/components/rm-router';
import './pages/app-home';
import './pages/app-about';
import './pages/app-user';

const template = document.createElement('template');
// language=html
template.innerHTML = `
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/user">User</a>
    <rm-router>
        <rm-route pattern="/" exact element="app-home"></rm-route>
        <rm-route pattern="/about" element="app-about"></rm-route>
        <rm-route pattern="/user" element="app-user"></rm-route>
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
}

customElements.define(AppRoot.is, AppRoot);
