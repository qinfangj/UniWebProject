"use strict";
import 'babel-polyfill';
import 'whatwg-fetch';
import "date-input-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import store from './core/store';
import routes from './routes';


const container = document.getElementById('container');
let routesWithStore = <Provider store={store}>{routes}</Provider>;

ReactDOM.render(routesWithStore, container);

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

