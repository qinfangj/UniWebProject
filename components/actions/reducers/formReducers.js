
import * as constants from '../actionTypes';


const defaultState = {
    projectInsertForm: {
        projectName: null,
        personInCharge: null,
        codeName: null,
        description: null,
        projectState: null,
        userMeetingDate: null,
        projectAnalysis: null,
        comments: null,
    },
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
            console.debug(action)
            return state;

        default:
            return state;
    }
};


export default formReducers;
