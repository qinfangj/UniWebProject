"use strict";
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import facilityDataReducers from '../components/actions/reducers/facilityDataReducers';
import commonReducers from '../components/actions/reducers/commonReducers';
import authReducers from '../components/actions/reducers/authReducers';
import adminReducers from '../components/actions/reducers/adminReducers';
import queryProjectsReducers from '../components/actions/reducers/queryProjectsReducers';
import queryRunsReducers from '../components/actions/reducers/queryRunsReducers';
import trackingReducers from '../components/actions/reducers/trackingReducers';
import optionsReducers from '../components/actions/reducers/forms/optionsReducers';
import secondaryOptionsReducers from '../components/actions/reducers/forms/secondaryOptionsReducers';
import feedbackReducers from '../components/actions/reducers/feedbackReducers';
import formReducers from '../components/actions/reducers/forms/formReducers';

import facilityDataFormsReducers from '../components/actions/reducers/forms/facilityDataFormsReducers';
import queryProjectsFormsReducers from '../components/actions/reducers/forms/queryProjectsFormsReducers';
import adminFormReducers from '../components/actions/reducers/forms/adminFormReducers';
import userDataReducers from '../components/actions/reducers/forms/userDataReducers';


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

// const logger = createLogger({
//     collapsed: true,
//     diff: false,  // much slower if true
// });

let middleware = [thunk];

console.log("store.js :: NODE_ENV:", process.env.NODE_ENV);
// Add logger, except for unit tests
if (process.env.NODE_ENV !== 'TEST') {
    // middleware = [ ...middleware, logger ];
    middleware = [ ...middleware ];
}

let reducer = combineReducers({
    facilityData: facilityDataReducers,
    common: commonReducers,
    auth: authReducers,
    admin: adminReducers,
    queryProjects: queryProjectsReducers,
    queryRuns: queryRunsReducers,
    tracking: trackingReducers,
    userData: userDataReducers,
    adminForms: adminFormReducers,
    facilityDataForms: facilityDataFormsReducers,
    queryProjectsForms: queryProjectsFormsReducers,
    options: optionsReducers,
    secondaryOptions: secondaryOptionsReducers,
    forms: formReducers,
    feedback: feedbackReducers,
});


const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
