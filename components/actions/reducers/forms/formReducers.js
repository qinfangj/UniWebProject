"use strict";
import types from '../../actionTypes';
import { initFacilityData } from '../../../forms/facilityData/formModels';
import formNames from '../../../constants/formNames';
import fields from '../../../forms/fields';


const defaultState = Object.freeze(Object.assign({},
    initFacilityData(),
));



let formReducers = (state = defaultState, action) => {

    let newState;
    let formData;
    let form;

    switch (action.type) {

        /* Change form data */

        /**
         * Reset form data. Expects `action.form` (form name).
         */
        case types.forms.RESET_FORM:
            newState = {...state};
            form = action.form;
            newState[form] = initFacilityData()[form];
            return newState;

        case types.forms.CHANGE_FORM_VALUE:
            newState = {...state};
            form = action.form;
            let field = action.field;
            // Create if not exists
            if (! (form in state)) {
                newState[form] = {};
                newState[form]._isValid = {};
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

            if (form === formNames.BIOANALYSERS_INSERT_FORM) {
                newState[form][fields.BIOANALYSER_FILE] = {value: "", filename: formData.filename, file: formData.file};
                // Cannot do that:  new File([""], formData.filename)
                //  because for security reasons, it can only be set to the empty string.
                let subform = formNames.BIOANALYSERS_LANES_INSERT_FORM;
                newState[subform] = newState[subform] || {};
                newState[subform]._isvalid = {};
                for (let lane of newState[form]["lanes"]) {
                    newState[subform][fields.PROJECT_ID +"_"+ lane.laneNb] = lane.projectId;
                    newState[subform][fields.LIBRARY_ID +"_"+ lane.laneNb] = lane.libId;
                    newState[subform][fields.COMMENT +"_"+ lane.laneNb] = lane.comment || "";
                }
            }

            return newState;

        /**
         * Add an empty lane to the bioanalysers sub form.
         */
        case types.forms.ADD_BIOLANE:
            newState = {...state};
            form = formNames.BIOANALYSERS_INSERT_FORM;
            let lanes = state[form]["lanes"] || [];
            let lastLaneNb = lanes.length > 0 ? lanes[lanes.length - 1].laneNb : 0;
            lanes.push({
                id: 0,
                laneNb: lastLaneNb + 1,
                projectId: undefined,
                libId: undefined,
                comment: '',
            });
            newState[form]["lanes"] = [...lanes];
            return newState;

        /**
         * Remove a lane from the bioanalysers sub form.
         * Expects `action.laneNb`, the lane number to remove.
         */
        case types.forms.REMOVE_BIOLANE:
            newState = {...state};
            form = formNames.BIOANALYSERS_INSERT_FORM;
            newState[form]["lanes"] = state[form]["lanes"].filter((lane) => lane.laneNb !== action.laneNb) || [];
            return newState;

        default:
            return state;
    }
};


export default formReducers;
