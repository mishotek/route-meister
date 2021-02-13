import { users } from '../assets/user-data';

const template = document.createElement('template');
// language=html
template.innerHTML = `
    <style>
        .page {
            padding: 0 48px;
        }
    </style>

    <div class="page">
        <h1>Users</h1>
        
        ${users.map((user) => `
            <a href="/users/${user.id}">${user.username}</a>
        `)}
    </div>
`;

export class AppUsers extends HTMLElement {
    static get is() {
        return 'app-users';
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define(AppUsers.is, AppUsers);
