
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import formReducers from '../components/actions/reducers/formReducers';
import commonReducers from '../components/actions/reducers/commonReducers';


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
    forms: formReducers,
    common: commonReducers,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
