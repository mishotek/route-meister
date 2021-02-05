const template = document.createElement('template');
// language=html
template.innerHTML = `
    <style>
        ul, li, a {
            list-style: none;
            text-decoration: none;
            margin: 0;
            padding: 0;
        }
        
        .header {
            display: flex;
            align-items: center;
            padding: 0 24px;
            height: 64px;
            border-bottom: solid 1px #c9c9c9;
        }
        
        .flex-center {
            display: flex;
            align-items: center;
        }
        
        .logo {
            height: 48px;
            margin-right: 6px;
        }
        
        .logo-text {
            color: black;
            font-size: 24px;
        }

        .logo-text:first-child {
            font-family: 'Merriweather', serif;
        }

        .logo-text:last-child {
            font-family: 'Heebo', sans-serif;
            padding-left: 2px;
        }
        
        .demo-badge {
            padding: 2px 6px;
            font-size: 10px;
            font-family: 'Merriweather', serif;
            border-radius: 3px;
            background: #fcc900;
            color: black;
            margin-left: 12px;
        }
        
        .list-item {
            height: 64px;
        }
        
        .link-slot {
            display: flex;
            align-items: center;
            margin-left: 48px;
        }

        .link-slot > slot::slotted(*) {
            font-family: 'Heebo', serif;
            text-decoration: none;
            color: rgba(0, 0, 0, 0.6);
            padding: 0 12px;
            height: 64px;
            display: flex;
            align-items: center;
            border-bottom: solid 2px transparent;
            
            will-change: border-color, color;
            transition: border-color 0.3s, color 0.3s;
        }

        .link-slot > slot::slotted(*:hover) {
            color: black;
        }

        .link-slot > slot::slotted(*.active) {
            color: black;
            border-bottom: solid 2px #fcc900;
        }
    </style>
    
    <header class="header">
        <ul class="flex-center">
            <li>
                <a href="/" class="list-item flex-center">
                    <img class="logo" src=".././assets/logo.png" alt="logo">
                    <span class="logo-text">Route</span>
                    <span class="logo-text">Meister</span>
                </a>
            </li>
            <li>
                <a class="demo-badge">DEMO</a>
            </li>
        </ul>
        
        <div class="link-slot">
            <slot></slot>
        </div>
    </header>
`;

export class AppHeader extends HTMLElement {
    static get is() {
        return 'app-header';
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define(AppHeader.is, AppHeader);
