'use strict';
import inputTypes from '../../forms/inputTypes';
import optionsStoreKeys from '../../constants/optionsStoreKeys';


const librariesProjectModel = {
    "project": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PROJECTS_ALL,
        label: "Project",
    },
    "organism": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.TAXONOMIES,
        label: "Organism",
    },
    "materialType": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.SAMPLE_TYPES,
        label: "Material type",
    },
    "libraryProtocol": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.LIB_PROTOCOLS,
        label: "Library protocol",
    },
    "adapters": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.LIB_ADAPTERS,
        label: "Adapters",
    },
    "libraryDate": {
        inputType: inputTypes.DATE,
        type: "date",
        label: "Library date",
    },
    "quantifMethod": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.QUANTIF_METHODS,
        label: "Quantification",
    },
    "isrobotMade": {
        inputType: inputTypes.CHECKBOX,
        label: "Made on robot",
    },
    "sequencingType": {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.RUN_TYPES_LENGTHS,
        label: "Sequencing type",
    },
};

export default librariesProjectModel;

