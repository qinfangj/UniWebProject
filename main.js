
import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import store from './core/store';
import routes from './pages/routes';


const container = document.getElementById('container');

function renderComponent(component) {
    ReactDOM.render(<Provider store={store}>{component}</Provider>, container);
}

renderComponent(routes);

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

// // Enable Hot Module Replacement (HMR)
// if (module.hot) {
//   module.hot.accept('./routes.json', () => {
//     routes = require('./routes.json'); // eslint-disable-line global-require
//     render(history.getCurrentLocation());
//   });
// }
// if (module.hot) {
//     module.hot.accept('./App', () => {
//         // Require the new version and render it instead
//         var NextApp = require('./App');
//         ReactDOM.render(<NextApp />, rootEl);
//     });
// }