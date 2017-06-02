'use strict';
import inputTypes from '../../forms/inputTypes';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import fields from '../../constants/fields';


const samplesProjectModel = {
    [fields.samples.PROJECT_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PROJECTS_ALL,
        label: "Project",
    },
    [fields.samples.TAXO_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.TAXONOMIES,
        label: "Organism",
    },
    [fields.samples.SAMPLE_TYPE_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.SAMPLE_TYPES,
        label: "Material type",
    },
    [fields.samples.RECEIVED_DATE]: {
        inputType: inputTypes.DATE,
        type: "date",
        label: "Received date",
    },
    [fields.samples.QUANTIF_METHOD_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.QUANTIF_METHODS,
        label: "Quantification",
    },

    // Request

    [fields.user_requests.LIB_PROTOCOL_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.LIB_PROTOCOLS,
        label: "Library type", 
    },
    [fields.user_requests.RUN_TYPES_LENGTH_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.RUN_TYPES_LENGTHS,
        label: "Sequencing type",
    },
};

export default samplesProjectModel;

