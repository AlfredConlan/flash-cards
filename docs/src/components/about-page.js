define(["exports","./my-app.js"],function(_exports,_myApp){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.AboutPage=_exports.$aboutPage=void 0;class AboutPage extends _myApp.PageViewElement{_render(){return _myApp.html`
      ${_myApp.SharedStyles}
      <h2>About</h2>
      
        This app is built on top of
        <a href="https://github.com/PolymerLabs/pwa-starter-kit">pwa-starter-kit</a>,
        with Web Components, Redux and <a href="https://github.com/polymer/lit-html">lit-html</a>.
        Find the code on <a href="https://github.com/notwaldorf/flash-cards">GitHub</a>.
      </p>
      
    `}}_exports.AboutPage=AboutPage;window.customElements.define("about-page",AboutPage);_exports.$aboutPage={AboutPage:AboutPage}});