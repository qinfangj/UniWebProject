"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators2';


const librariesModel = {
    [fields.PROJECT_ID]: {
        width: 4,
        label: "Project",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE,
        required: true,
    },
    [fields.SAMPLE_ID]: {
        width: 2,
        label: "Sample",
        inputType: inputTypes.SEC_DROPDOWN,
        refModelName: "facilityDataForms.libraries." + fields.PROJECT_ID,
        optionsKey: optionsStoreKeys.SAMPLES_FOR_PROJECT,
        required: true,
    },
    [fields.NAME]: {
        width: 2,
        label: "Name",
        inputType: inputTypes.TEXT,
        required: true,
        validators: {mediumString: validators.mediumStringValidator},
        errorMessages: {mediumString: "0-30 characters."},
    },
    [fields.LIB_PROTOCOL_ID]: {
        width: 2,
        label: "Library type",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.LIB_PROTOCOLS,
        required: true,
    },
    [fields.STARTING_MATERIAL]: {
        width: 2,
        label: "Starting material",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.LIBRARY_DATE]: {
        width: 2,
        label: "Library date",
        inputType: inputTypes.DATE,
    },
    [fields.BIOANALYSER_PEAK]: {
        width: 2,
        label: "Bioanalyser peak",
        inputType: inputTypes.TEXT,
        type: "number",
    },
    [fields.FRAG_SIZE_MIN]: {
        width: 2,
        label: "Frag.size(min)",
        inputType: inputTypes.TEXT,
        required: true,
        type: "number",
    },
    [fields.FRAG_SIZE_MAX]: {
        width: 2,
        label: "Frag.size(max)",
        inputType: inputTypes.TEXT,
        required: true,
        type: "number",
    },
    [fields.CONCENTRATION]: {
        width: 2,
        label: "Contentration",
        inputType: inputTypes.TEXT,
        type: "number",
    },
    [fields.QUANTIF_METHOD_ID]: {
        width: 2,
        label: "Quantification",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.QUANTIF_METHODS,
        required: true,
    },
    [fields.MULTIPLEX_INDEX_7_ID]: {
        width: 2,
        label: "Multiplex index (I7)",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.MULTIPLEX_INDEXES,
        required: true,
    },
    [fields.MULTIPLEX_INDEX_5_ID]: {
        width: 2,
        label: "Multiplex index (I5)",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.MULTIPLEX_INDEXES,
        required: true,
    },
    [fields.VOLUME]: {
        width: 2,
        label: "Volume",
        inputType: inputTypes.TEXT,
        type: "number",
    },
    [fields.ADAPTER_ID]: {
        width: 2,
        label: "Adapter",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.LIB_ADAPTERS,
        required: true,
    },
    [fields.KITS_LOTS]: {
        width: 4,
        label: "Illumina kits and lots",
        inputType: inputTypes.TEXT,
    },
    [fields.COMMENT]: {
        width: 10,
        label: "Internal comment",
        inputType: inputTypes.TEXT,
    },
    [fields.LIBRARY_STATE_ID]: {
        width: 2,
        label: "Library state",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.LIB_STATES,
    },
    [fields.COMMENT_CUSTOMER]: {
        width: 10,
        label: "Comment",
        inputType: inputTypes.TEXTAREA,
    },
    [fields.IS_CUSTOMER_MADE]: {
        width: 2,
        label: "Made by user",
        inputType: inputTypes.CHECKBOX,
    },
    [fields.IS_ROBOT_MADE]: {
        width: 2,
        label: "Made by robot",
        inputType: inputTypes.CHECKBOX,
    },
    [fields.IS_TRASHED]: {
        width: 2,
        label: "Discarded",
        inputType: inputTypes.CHECKBOX,
    }
};


export default librariesModel;

