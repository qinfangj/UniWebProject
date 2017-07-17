"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators';


const librariesModel = {
    fields: [
        {
            name: fields.PROJECT_ID,
            width: 4,
            label: "Project",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE,
            required: true,
        },{
            name: fields.SAMPLE_ID,
            width: 2,
            label: "Sample",
            inputType: inputTypes.SEC_DROPDOWN,
            refModelName: "facilityDataForms.libraries." + fields.PROJECT_ID,
            optionsKey: optionsStoreKeys.SAMPLES_FOR_PROJECT,
            required: true,
        },{
            name: fields.NAME,
            width: 2,
            label: "Name",
            inputType: inputTypes.TEXT,
            required: true,
            validators: {mediumString: validators.mediumStringValidator},
            errorMessages: {mediumString: "0-30 characters."},
        },{
            name: fields.LIB_PROTOCOL_ID,
            width: 2,
            label: "Library type",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.LIB_PROTOCOLS,
            required: true,
        },{
            name: fields.STARTING_MATERIAL,
            width: 2,
            label: "Starting material",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.LIBRARY_DATE,
            width: 2,
            label: "Library date",
            inputType: inputTypes.DATE,
            required: true,
        },{
            name: fields.BIOANALYSER_PEAK,
            width: 2,
            label: "Bioanalyser peak",
            inputType: inputTypes.TEXT,
            type: "number",
            required: true,
        },{
            name: fields.FRAG_SIZE_MIN,
            width: 2,
            label: "Frag.size(min)",
            inputType: inputTypes.TEXT,
            required: true,
            type: "number",
        },{
            name: fields.FRAG_SIZE_MAX,
            width: 2,
            label: "Frag.size(max)",
            inputType: inputTypes.TEXT,
            required: true,
            type: "number",
        },{
            name: fields.CONCENTRATION,
            width: 2,
            label: "Concentration",
            inputType: inputTypes.TEXT,
            type: "number",
            required: true,
        },{
            name: fields.QUANTIF_METHOD_ID,
            width: 2,
            label: "Quantification",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.QUANTIF_METHODS,
            required: true,
        },{
            name: fields.MULTIPLEX_INDEX_7_ID,
            width: 2,
            label: "Multiplex index (I7)",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.MULTIPLEX_INDEXES,
            required: true,
        },{
            name: fields.MULTIPLEX_INDEX_5_ID,
            width: 2,
            label: "Multiplex index (I5)",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.MULTIPLEX_INDEXES,
            required: true,
        },{
            name: fields.VOLUME,
            width: 2,
            label: "Volume",
            inputType: inputTypes.TEXT,
            type: "number",
        },{
            name: fields.ADAPTER_ID,
            width: 2,
            label: "Adapter",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.LIB_ADAPTERS,
            required: true,
        },{
            name: fields.KITS_LOTS,
            width: 4,
            label: "Illumina kits and lots",
            inputType: inputTypes.TEXT,
        },{
            name: fields.COMMENT,
            width: 10,
            label: "Internal comment",
            inputType: inputTypes.TEXT,
        },{
            name: fields.LIBRARY_STATE_ID,
            width: 2,
            label: "Library state",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.LIB_STATES,
            required: true,
        },{
            name: fields.COMMENT_CUSTOMER,
            width: 10,
            label: "Comment",
            inputType: inputTypes.TEXTAREA,
        },{
            name: fields.IS_CUSTOMER_MADE,
            width: 2,
            label: "Made by user",
            inputType: inputTypes.CHECKBOX,
        },{
            name: fields.IS_ROBOT_MADE,
            width: 2,
            label: "Made by robot",
            inputType: inputTypes.CHECKBOX,
        },{
            name: fields.IS_TRASHED,
            width: 2,
            label: "Discarded",
            inputType: inputTypes.CHECKBOX,
        }
    ],
    model: "libraries"
};


export default librariesModel;

