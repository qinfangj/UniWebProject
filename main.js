/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import store from './core/store';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import * as r from './pages/routes';
import * as fdata from './pages/facilityData/facilityDataRoutes';

const routes = (
    <Router history={browserHistory} >
        <Route path="/" component={r.App}>
            <IndexRoute component={r.HomePage}/>
            <Route path="home" component={r.HomePage}/>
            <Route path="data" component={fdata.FacilityDataRoute}/>
            <Route path="data/projects" component={fdata.ProjectsListRoute}/>
            <Route path="data/projects/list" component={fdata.ProjectsListRoute}/>
            <Route path="data/projects/active" component={fdata.ProjectsActiveRoute}/>
            <Route path="data/projects/new" component={fdata.ProjectsNewRoute}/>
            <Route path="data/people" component={fdata.PeopleListRoute}/>
            <Route path="data/people/list" component={fdata.PeopleListRoute}/>
            <Route path="data/people/active" component={fdata.PeopleActiveRoute}/>
            <Route path="data/people/new" component={fdata.PeopleNewRoute}/>
            <Route path="data/genomes" component={fdata.GenomesListRoute}/>
            <Route path="data/genomes/list" component={fdata.GenomesListRoute}/>
            <Route path="data/genomes/active" component={fdata.GenomesActiveRoute}/>
            <Route path="data/genomes/new" component={fdata.GenomesNewRoute}/>
            <Route path="data/samples" component={fdata.SamplesListRoute}/>
            <Route path="data/samples/list" component={fdata.SamplesListRoute}/>
            <Route path="data/samples/active" component={fdata.SamplesActiveRoute}/>
            <Route path="data/samples/new" component={fdata.SamplesNewRoute}/>
        </Route>
    </Router>
);

const container = document.getElementById('container');

function renderComponent(component) {
    ReactDOM.render(<Provider store={store}>{component}</Provider>, container);
}

renderComponent(routes);

// let routes = require('./routes.json'); // Loaded with utils/routes-loader.js
// function renderComponent(component) {
//   ReactDOM.render(<Provider store={store}>{component}</Provider>, container);
// }

// // Find and render a web page matching the current URL path,
// // if such page is not found then render an error page (see routes.json, core/router.js)
// function render(location) {
//   router.resolve(routes, location)
//     .then(renderComponent)
//     .catch(error => router.resolve(routes, { ...location, error }).then(renderComponent));
// }

// // Handle client-side navigation by using HTML5 History API
// // For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
// history.listen(render);
// render(history.getCurrentLocation());

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