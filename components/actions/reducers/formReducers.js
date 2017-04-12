"use strict";
import types from '../actionTypes';
import { initFacilityData } from '../../forms/facilityData/formModels';
import constants from '../../constants/constants';


const defaultState = Object.freeze(Object.assign({},
    initFacilityData(),
));



let formReducers = (state = defaultState, action) => {

    let newState;
    let formData;
    let form;

    switch (action.type) {

        /* Messages */

        case types.forms.FORM_SUBMISSION_SUCCESS:
            newState = {...state};
            newState[action.form]._submission = {
                status: constants.SUBMISSION_SUCCESS,
                msg: action.msg,
                error: null,
            };
            return newState;

        case types.forms.FORM_SUBMISSION_ERROR:
            newState = {...state};
            newState[action.form]._submission = {
                status: constants.SUBMISSION_ERROR,
                msg: action.msg,
                error: action.error,
            };
            return newState;

        case types.forms.FORM_SERVER_ERROR:
            newState = {...state};
            newState[action.form]._submission = {
                status: constants.SERVER_ERROR,
                msg: action.msg,
                error: action.error,
            };
            return newState;

        case types.forms.FORM_FEEDBACK_RESET:
            newState = {...state};
            newState[action.form]._submission = {
                status: constants.NONE,
                msg: "",
                error: null,
            };
            return newState;

        /* Change form data */

        /**
         * Reset form data. Expects `action.form` (form name).
         */
        case types.forms.RESET_FORM:
            newState = {...state};
            form = action.form;
            newState[form] = initFacilityData()[form];
            // Keep the submission state
            newState[form]._submission = state[form]._submission;
            return newState;

        case types.forms.CHANGE_FORM_VALUE:
            newState = {...state};
            form = action.form;
            let field = action.field;
            // Create if not exists
            if (! (form in state)) {
                newState[form] = {};
            }
            //console.debug("Change form value:", field, action.valid, action.value)
            newState[form][field] = action.value;
            newState[form]._isValid[field] = action.valid;
            return newState;

        /**
         * Takes the data for a database row that we queried by ID to fill the related form for update.
         * Expects `action.form` (form name), `action.data` (row data).
         */
        case types.forms.FILL_UPDATE_FORM:
            newState = {...state};
            form = action.form;
            formData = state[form] || {};  // current state
            Object.assign(formData, action.data);  // updated state
            console.debug("Update with:", formData);
            newState[form] = formData;
            newState[form]._isValid = {};
            // Above we supposed that the keys returned by the backend (Slick auto-generated models)
            // correspond to what is defined in ./fields.js. Otherwise, add exceptions here.
            // -- [exceptions] --
            return newState;

        default:
            return state;
    }
};


export default formReducers;
