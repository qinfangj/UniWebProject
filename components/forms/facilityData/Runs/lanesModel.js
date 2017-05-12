"use strict";
import fields from '../../fields';
import formNames from '../../../constants/formNames';
import { dateNow } from '../../../../utils/time';
import inputTypes from '../../inputTypes';
import { DEFAULT_DATE } from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators2';


const lanesModel = {
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
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.LIBRAIRIES_FOR_PROJECT,
            required: true,
        },
        "concentration": {
            width: 4,
            inputType: inputTypes.TEXT,
            required: true,
            type: "number",
            // validators: {isNumber: validators.numberValidator},
            // errorMessages: {isNumber: "Must be a number"}
        },
        "qualityId": {
            width: 4,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.SEQUENCING_QUALITIES,
            hasNoneValue: false,
            required: true,
        },
    }
};

export default lanesModel;

