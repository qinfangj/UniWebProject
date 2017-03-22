"use strict";
import types from '../actionTypes';
import returnList from './base';
import facilityDataModels from '../../forms/facilityData/formModels';
import { inputTypes } from '../../forms/facilityData/formModels';


function isValid(value, type, required, setValid) {
    let valid = true;
    if (required) {
        if (type === inputTypes.TEXT || type === inputTypes.TEXTAREA) {
            valid = value !== "";
        } else if (type === inputTypes.DROPDOWN || type === inputTypes.SEC_DROPDOWN) {
            valid = value !== -1;
        }
    } else {
        valid = setValid;
    }
    return valid;
}

function initialFacilityData() {
    let initialData = {};
    for (let form of Object.keys(facilityDataModels)) {
        initialData[form] = {};
        initialData[form]._isValid = {};
        for (let field of Object.keys(facilityDataModels[form])) {
            let model = facilityDataModels[form][field];
            let value = model.defaultValue;
            let setValid = model.valid;
            let required = model.required;
            let type = model.type;
            initialData[form][field] = value;
            initialData[form]._isValid[field] = isValid(value, type, required, setValid);
        }
    }
    return initialData;
}

const defaultState = Object.assign({},
    initialFacilityData(),
);



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
         */
        case types.forms.RESET_FORM:
            newState = Object.assign({}, state);
            form = action.form;
            newState[form] = initialFacilityData()[form];
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
