"use strict";
import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import facilityDataReducers from '../components/actions/reducers/facilityDataReducers';
import commonReducers from '../components/actions/reducers/commonReducers';
import authReducers from '../components/actions/reducers/authReducers';
import queryProjectsReducers from '../components/actions/reducers/queryProjectsReducers';
import formReducers from '../components/actions/reducers/formReducers';
import adminFormReducers from '../components/actions/reducers/adminFormReducers';

//import {combineForms,formReducer} from  'react-redux-form'
//import adminDataConstants from '../components/forms/adminData/adminDataConstants';

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
console.log("store.js :: NODE_ENV:", process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'TEST') {
    middleware = [ ...middleware, logger ]
}

let reducer = combineReducers({
    facilityData: facilityDataReducers,
    common: commonReducers,
    auth: authReducers,
    queryProjects: queryProjectsReducers,
    adminForms:adminFormReducers,
    forms: formReducers,

});


const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
