"use strict";
import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';


/**
 * The sub-form in Runs to insert libraries in lanes.
 */
const runLanesModel = {
    lane: {
        "comment": {
            width: 4,
            inputType: inputTypes.TEXTAREA,
            required: false,
        },
    },
    lib: {
        "projectId": {
            width: 4,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.PROJECTS_HAVING_A_LIBRARY,
            required: true,
        },
        "libraryId": {
            width: 4,
            inputType: inputTypes.SEC_DROPDOWN,
            optionsKey: optionsStoreKeys.LIBRAIRIES_FOR_PROJECT,
            required: true,
        },
        "quantityLoaded": {
            width: 4,
            inputType: inputTypes.TEXT,
            type: "number",
        },
        "qualityId": {
            width: 4,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.SEQUENCING_QUALITIES,
            hasNoneValue: true,
            required: true,
        },
    }
};

export default runLanesModel;

