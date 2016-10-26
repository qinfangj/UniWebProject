
import types from '../actionTypes';
import constants from '../../constants/constants';


const defaultState = {
};


let commonReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.TOGGLE_SIDEBAR:
            console.debug("reducer:", action.open)
            return Object.assign(state, {sidebarOpen: action.open});

        default:
            return state;
    }
};


export default commonReducers;
