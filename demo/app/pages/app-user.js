import { users } from '../assets/user-data';

const template = document.createElement('template');
// language=html
template.innerHTML = `
    <style>
        .page {
            padding: 0 24px;
        }
    </style>
    
    <div class="page">
        <h1>User</h1>

        <p id="name"></p>
        <p id="username"></p>
        <p id="email"></pid>
    </div>
`;

export class AppUser extends HTMLElement {
    static get is() {
        return 'app-user';
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    routeChangedCallback(navigationLocation, params) {
        if (params.id) {
            const selectedUser = users
                .find((user) => user.id === Number(params.id));
            this._showUser(selectedUser);
        }
    }

    _showUser(user) {
        this.shadowRoot.getElementById('name').innerHTML = user ? user.name : '';
        this.shadowRoot.getElementById('username').innerHTML = user ? user.username : '';
        this.shadowRoot.getElementById('email').innerHTML = user ? user.email : '';
    }
}

customElements.define(AppUser.is, AppUser);
