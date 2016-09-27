
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
            return newState;

        case constants.INSERT:
            if (! (action.fields.length === action.values.length)) {
                throw "The number of fields must equal the number of values";
            }
            return state;

        default:
            return state;
    }
};


export default formReducers;
