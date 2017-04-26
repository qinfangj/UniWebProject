"use strict";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import facilityDataReducers from '../components/actions/reducers/facilityDataReducers';
import commonReducers from '../components/actions/reducers/commonReducers';
import authReducers from '../components/actions/reducers/authReducers';
import adminReducers from '../components/actions/reducers/adminReducers';
import queryProjectsReducers from '../components/actions/reducers/queryProjectsReducers';
import selectOptionsReducers from '../components/actions/reducers/selectOptionsReducers';
import feedbackReducers from '../components/actions/reducers/feedbackReducers';

import formReducers from '../components/actions/reducers/forms/formReducers';
import runsFormReducers from '../components/actions/reducers/forms/runsFormReducers';
import adminFormReducers from '../components/actions/reducers/forms/adminFormReducers';


/*
 * Redux store
 */

/*
 * store.getState() will return an object of the form
 * { <reducer1> key: ...,
 *   <reducer2> key: ...,
 *   ...
 *  }
 */

const logger = createLogger({
    collapsed: true,
    diff: false,
});

let middleware = [thunk];
console.log("store.js :: NODE_ENV:", process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'TEST') {
    middleware = [ ...middleware, logger ]
}

let reducer = combineReducers({
    facilityData: facilityDataReducers,
    common: commonReducers,
    auth: authReducers,
    admin: adminReducers,
    queryProjects: queryProjectsReducers,
    adminForms: adminFormReducers,
    runsForms: runsFormReducers,
    options: selectOptionsReducers,
    forms: formReducers,
    feedback: feedbackReducers,
});


const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
