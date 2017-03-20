
import types from '../actionTypes';
import { hashHistory } from 'react-router';

"use strict";

const defaultState = {
    route: {data: {}},
    error: {response: null, origin: null},
};


let commonReducers = (state = defaultState, action) => {

    let newState;

    switch (action.type) {

        case types.TOGGLE_SIDEBAR:
            return Object.assign({}, state, {sidebarOpen: action.open});

        case types.GOTO:
            hashHistory.push(action.url, action.query, action.state);
            return Object.assign({}, state, {
                route: {
                    url: action.url,
                    query: action.query,
                    state: action.state,
                    data: action.data,
                }
            });

        case types.ERROR:
            return Object.assign({}, state, {
                error: {
                    response: action.error,
                    origin: action.origin,
                }
            });

        default:
            return state;
    }
};


export default commonReducers;