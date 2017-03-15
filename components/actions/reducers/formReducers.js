"use strict";
import types from '../actionTypes';
import formStoreKeys from '../../constants/formStoreKeys';
import returnList from './base';


const defaultState = {};



let formReducers = (state = defaultState, action) => {

    let newState;
    let form;

    switch (action.type) {

        /* Select options list */

        case types.forms.GET_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        case types.forms.GET_SECONDARY_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

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
