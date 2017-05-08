"use strict";
import fields from '../../fields';
// import formNames from '../../../constants/formNames';
import { dateNow } from '../../../../utils/time';
import inputTypes from '../../inputTypes';
// import { DEFAULT_DATE } from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators2';


const intValidator = {isInteger: validators.integerValidator};

const runsModel = {
    [fields.runs.GA_RUN_NUMBER]: {
        width: 1,
        label: "Run#",
        type: inputTypes.TEXT,
        initValue: "",
        required: true,
        validators: intValidator,
        errorMessages: {isInteger: "Must be an integer"}
    },
    [fields.runs.FLOWCELL_ID]: {
        width: 3,
        label: "Flowcell ID",
        type: inputTypes.TEXT,
        initValue: "",
        required: true,
    },
    [fields.runs.FLOWCELL_TYPE_ID]: {
        width: 2,
        label: "Version",
        type: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.FLOWCELL_TYPES,
        initValue: -1,
        required: false,
    },
    [fields.runs.RELEASE_DATE]: {
        width: 3,
        label: "Cluster Date",
        type: inputTypes.DATE,
        initValue: dateNow(),
        required: true,
    },
    [fields.runs.INSTRUMENT_ID]: {
        width: 3,
        label: "Machine",
        type: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.INSTRUMENTS,
        initValue: -1,
        required: false,
    },
    [fields.runs.GA_RUN_DATE]: {
        width: 3,
        label: "Run Date",
        type: inputTypes.DATE,
        initValue: dateNow(),
        required: true,
    },

    /* Mini sub-form on the left, sharing 4 width units on the left */
    [fields.runs.RUN_TYPES_LENGTH_ID]: {
        width: 3,
        label: "Run type",
        type: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.RUN_TYPES_LENGTHS,
        initValue: -1,
    },
    [fields.runs.FC_STAGE]: {
        width: 3,
        label: "Stage",
        type: inputTypes.DROPDOWN,
        initValue: -1,
        hasNoneValue: false,
        options: [[1,'--'], [2,'A'], [3,'B']],
    },
    [fields.runs.SEQUENCING_KIT_VERSION_ID]: {
        width: 3,
        label: "Kit",
        type: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.SEQUENCING_KIT_VERSIONS,
        initValue: -1,
    },
    [fields.runs.IS_FAILED]: {
        width: 2,
        label: "Run failed",
        type: inputTypes.CHECKBOX,
        initValue: false,
    },

    /* Comment, using 8 units on the right */
    [fields.runs.COMMENT]: {
        width: 10,
        label: "Comment",
        type: inputTypes.TEXTAREA,
        initValue: "",
    },

};


export function initializeRunsReducers() {
    let initialData = {};
    for (let field of Object.keys(runsModel)) {
        initialData[field] = runsModel[field].initValue;
    }
    return initialData;
}


export default runsModel;

