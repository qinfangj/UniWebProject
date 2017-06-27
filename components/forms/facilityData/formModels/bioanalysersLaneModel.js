"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';


/**
 * The sub-form in Bioanalysers to insert lanes.
 */
const bioanalysersLaneModel = {
    [fields.PROJECT_ID]: {
        width: 4,
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PROJECTS_HAVING_A_LIBRARY,
        required: true,
    },
    [fields.LIBRARY_ID]: {
        width: 4,
        inputType: inputTypes.SEC_DROPDOWN,
        optionsKey: optionsStoreKeys.LIBRAIRIES_FOR_PROJECT,
        required: true,
    },
    [fields.COMMENT]: {
        width: 4,
        inputType: inputTypes.TEXT,
    },
};

export default bioanalysersLaneModel;

