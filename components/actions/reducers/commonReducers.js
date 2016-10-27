
import types from '../actionTypes';
import constants from '../../constants/constants';
import history from '../../../core/history';


const defaultState = {
};


let commonReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.TOGGLE_SIDEBAR:
            return Object.assign(state, {sidebarOpen: action.open});

        case types.GOTO:
            return Object.assign(state, {route: action.url});

        default:
            return state;
    }
};


export default commonReducers;
