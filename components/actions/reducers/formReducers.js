
import * as constants from '../actionTypes';


const defaultState = {
};


let formReducers = (state = defaultState, action) => {

    switch (action.type) {

        case constants.INSERT:
            console.debug(action)
            return state;

        default:
            return state;
    }
};


export default formReducers;
