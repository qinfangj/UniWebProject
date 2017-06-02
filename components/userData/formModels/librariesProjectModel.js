'use strict';
import inputTypes from '../../forms/inputTypes';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import fields from '../../constants/fields';


const librariesProjectModel = {
    [fields.libraries.PROJECT_ID]: {
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
    [fields.libraries.LIB_PROTOCOL_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.LIB_PROTOCOLS,
        label: "Library protocol",
    },
    [fields.libraries.ADAPTER_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.LIB_ADAPTERS,
        label: "Adapters",
    },
    [fields.libraries.LIBRARY_DATE]: {
        inputType: inputTypes.DATE,
        type: "date",
        label: "Library date",
    },
    [fields.libraries.QUANTIF_METHOD_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.QUANTIF_METHODS,
        label: "Quantification",
    },
    [fields.libraries.IS_ROBOT_MADE]: {
        inputType: inputTypes.CHECKBOX,
        label: "Made on robot",
    },
    [fields.user_requests.RUN_TYPES_LENGTH_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.RUN_TYPES_LENGTHS,
        label: "Sequencing type",
    },
};

export default librariesProjectModel;

