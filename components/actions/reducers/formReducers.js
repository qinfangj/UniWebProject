
import * as constants from '../actionTypes';


const defaultState = {
    projectInsertForm: {},
};


let formReducers = (state = defaultState, action) => {

    switch (action.type) {

        case constants.CHANGE_FORM_INPUT:
            let newState = Object.assign({}, state);
            if (! action.form in defaultState) {
                throw "Unknown form name, should be the same as in `defaultState`";
            }
            newState[action.form][action.field] = action.value;
            console.debug("Reducer:", newState.projectInsertForm);
            return newState;

        default:
            return state;
    }
};


export default formReducers;
