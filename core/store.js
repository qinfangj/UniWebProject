"use strict";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import facilityDataReducers from '../components/actions/reducers/facilityDataReducers';
import commonReducers from '../components/actions/reducers/commonReducers';
import authReducers from '../components/actions/reducers/authReducers';
import adminReducers from '../components/actions/reducers/adminReducers';
import queryProjectsReducers from '../components/actions/reducers/queryProjectsReducers';
import trackingReducers from '../components/actions/reducers/trackingReducers';
import optionsReducers from '../components/actions/reducers/forms/optionsReducers';
import secondaryOptionsReducers from '../components/actions/reducers/forms/secondaryOptionsReducers';
import feedbackReducers from '../components/actions/reducers/feedbackReducers';

import formReducers from '../components/actions/reducers/forms/formReducers';
import facilityDataFormsReducers from '../components/actions/reducers/forms/facilityDataFormsReducers';
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
// Add logger, except for unit tests
if (process.env.NODE_ENV !== 'TEST') {
    middleware = [ ...middleware, logger ]
}

let reducer = combineReducers({
    facilityData: facilityDataReducers,
    common: commonReducers,
    auth: authReducers,
    admin: adminReducers,
    queryProjects: queryProjectsReducers,
    tracking: trackingReducers,
    adminForms: adminFormReducers,
    facilityDataForms: facilityDataFormsReducers,
    options: optionsReducers,
    secondaryOptions: secondaryOptionsReducers,
    forms: formReducers,
    feedback: feedbackReducers,
});


const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
