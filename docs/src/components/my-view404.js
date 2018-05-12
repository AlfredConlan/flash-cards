define(["./my-app.js"],function(_myApp){"use strict";class MyView404 extends _myApp.PageViewElement{_render(){return _myApp.html`
      ${_myApp.SharedStyles}
      <h2>Oops! You hit a 404!</h2>
      <p>This page is not a thing.
        Head back <a href="/">to safety</a>.
      </p>
    `}}window.customElements.define("my-view404",MyView404)});