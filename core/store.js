
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import asyncReducers from '../components/actions/reducers/asyncReducers';
import commonReducers from '../components/actions/reducers/commonReducers';
import authReducers from '../components/actions/reducers/authReducers';
import queryProjectsReducers from '../components/actions/reducers/queryProjectsReducers';


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

let reducer = combineReducers({
    async: asyncReducers,
    common: commonReducers,
    auth: authReducers,
    queryProjects: queryProjectsReducers,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
