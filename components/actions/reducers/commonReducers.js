
import types from '../actionTypes';
import { browserHistory } from 'react-router';


const defaultState = {
    route: {},
};


let commonReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.TOGGLE_SIDEBAR:
            return Object.assign(state, {sidebarOpen: action.open});

        case types.GOTO:
            browserHistory.push(action.url, action.query, action.state);
            console.debug("reducer:", action.data)
            return Object.assign(state, {
                route: {
                    url: action.url,
                    query: action.query,
                    state: action.state,
                    data: action.data,
                }
            });

        default:
            return state;
    }
};


export default commonReducers;
