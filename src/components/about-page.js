import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';

export class AboutPage extends PageViewElement {
    _render(props) {
        return html `
      ${SharedStyles}
      <h2>About</h2>
      
        This app is built on top of
        <a href="https://github.com/PolymerLabs/pwa-starter-kit">pwa-starter-kit</a>,
        with Web Components, Redux and <a href="https://github.com/polymer/lit-html">lit-html</a>.
        Find the code on <a href="https://github.com/notwaldorf/flash-cards">GitHub</a>.
      </p>
      
    `
    }
}

window.customElements.define('about-page', AboutPage);