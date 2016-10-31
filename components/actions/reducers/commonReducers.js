
import types from '../actionTypes';
import constants from '../../constants/constants';


const defaultState = {
};


let commonReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.TOGGLE_SIDEBAR:
            return Object.assign(state, {sidebarOpen: action.open});

        case types.TOGGLE_SIDEBAR_SUBMENU:
            return Object.assign(state, {sidebarSubmenuOpen: action.open});

        case types.GOTO:
            return Object.assign(state, {route: action.url});

        default:
            return state;
    }
};


export default commonReducers;
