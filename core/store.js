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

import {combineForms} from  'react-redux-form'


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


const initialAdminFormState = {     discription: '',     customerViewable: '',     useAllReads:'',     comment:'' };


let reducer = combineReducers({
    facilityData: facilityDataReducers,
    common: commonReducers,
    auth: authReducers,
    queryProjects: queryProjectsReducers,
    forms: formReducers,
    adminForms:combineForms(
        {
            adminSubmitForm: initialAdminFormState
        }
    ,'adminForms')

    //...createForms ({adminSubmitForm :{}})
});


const store = createStore(reducer,applyMiddleware(thunk, logger));

export default store;
