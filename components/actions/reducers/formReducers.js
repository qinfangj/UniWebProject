"use strict";
import types from '../actionTypes';
import returnList from './base';


const defaultState = {};



let formReducers = (state = defaultState, action) => {

    let newState;
    let formData;
    let form;

    switch (action.type) {

        /* Select options list */

        case types.forms.GET_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        case types.forms.GET_SECONDARY_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        /**
         * Reset form data. Expects `action.form` (form name).
         * It is hacky, based on the fact that text/textarea fields return a string value,
         * options lists a numeric value, dates a formatted string value, and checkboxes a boolean value.
         * Special formatters are only applied to the submitted object anyway - never to the actual
         * stored values but to a copy that only exists for the time of the submission.
         */
        case types.forms.EMPTY_FORM:
            newState = Object.assign({}, state);
            form = action.form;
            formData = Object.assign({}, state[form]);
            if (formData) {
                for (let key of Object.keys(formData)) {
                    let value = formData[key];
                    // Reset checkboxes
                    if (typeof(value) === "boolean") {
                        formData[key] = false;
                    // Reset options
                    } else if (typeof(value) === "number") {
                        formData[key] = [];
                    // Reset dates
                    } else if (new Date(value).getTime() > 0) {
                        formData[key] = "1970-01-01";
                    // Reset text
                    } else if (typeof(value) === "string") {
                        formData[key] = "";
                    }
                }
            }
            newState[form] = formData;
            newState[form]._isValid = {};
            return newState;

        case types.forms.CHANGE_FORM_VALUE:
            newState = Object.assign({}, state);
            form = action.form;
            let field = action.field;
            // Create if not exists
            if (! (form in state)) {
                newState[form] = {};
            }
            //console.debug(field, action.valid, action.value)
            newState[form][field] = action.value;
            newState[form]._isValid[field] = action.valid;
            return newState;

        /**
         * Takes the data for a database row that we queried by ID to fill the related form for update.
         * Expects `action.form` (form name), `action.data` (row data).
         */
        case types.forms.FILL_UPDATE_FORM:
            newState = Object.assign({}, state);
            form = action.form;
            formData = state[form] || {};  // current state
            Object.assign(formData, action.data);  // updated state
            console.debug(formData)
            newState[form] = formData;
            newState[form]._isValid = {};
            // Above we supposed that the keys returned by the backend (Slick auto-generated models)
            // correspond to what is defined in ./fields.js. Otherwise, add exceptions here.
            return newState;

        default:
            return state;
    }
};


export default formReducers;
