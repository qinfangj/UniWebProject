"use strict";
import types from '../actionTypes';
import formStoreKeys from '../../constants/formStoreKeys';


const defaultState = {
};


let formReducers = (state = defaultState, action) => {

    let newState;
    let form;

    switch (action.type) {

        /**
         * Reset form data. Expects `action.form` (form name).
         */
        case types.forms.EMPTY_FORM:
            newState = Object.assign({}, state);
            newState[action.form] = {};
            newState[action.form]._isValid = {};
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

            /* Special cases */

            // QP: Reset samples selection if projects selection changes
            if (form === formStoreKeys.QUERY_PROJECTS_FORM
                && field === form + formStoreKeys.suffixes.PROJECTS) {
              newState[form][form + formStoreKeys.suffixes.SAMPLES] = {};
            }

            return newState;

        /**
         * Takes the data for a database row that we queried by ID to fill the related form for update.
         * Expects `action.form` (form name), `action.data` (row data).
         */
        case types.forms.FILL_UPDATE_FORM:
            newState = Object.assign({}, state);
            form = action.form;
            let formData = state[form] || {};  // current state
            Object.assign(formData, action.data);  // updated state
            newState[form] = formData;
            newState[form]._isValid = {};
            // Above we supposed that the keys returned by the backend (Slick auto-generated models)
            // correspond to what is defined in ./fields.js. Otherwise, add exceptions here.
            return newState;

        /**
         * Specific to queryProjects, but acts on centralized form values, so we treat it here as well.
         */
        case types.queryProjects.RESET_SELECTION:
            newState = Object.assign({}, state);
            let qpForm = formStoreKeys.QUERY_PROJECTS_FORM;
            let samplesKey = qpForm + formStoreKeys.suffixes.SAMPLES;
            let projectsKey = qpForm + formStoreKeys.suffixes.PROJECTS;
            if (newState[qpForm] !== undefined) {
                newState[qpForm][samplesKey] = {};
                newState[qpForm][projectsKey] = {};
            }
            return newState;

        default:
            return state;
    }
};


export default formReducers;
