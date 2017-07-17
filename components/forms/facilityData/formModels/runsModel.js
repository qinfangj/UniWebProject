"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators';


const runsModel = {
    fields: [
        {
            name: fields.runs.GA_RUN_NUMBER,
            width: 2,
            label: "Run#",
            type: "number",
            inputType: inputTypes.TEXT,
            required: true,
            validators: {isInteger: validators.integerValidator},
            errorMessages: {isInteger: "Must be an integer."},
        },{
            name: fields.runs.FLOWCELL,
            width: 3,
            label: "Flowcell ID",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.runs.FLOWCELL_TYPE_ID,
            width: 2,
            label: "Version",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.FLOWCELL_TYPES,
            required: true,
        },{
            name: fields.runs.RELEASE_DATE,
            width: 3,
            label: "Cluster Date",
            inputType: inputTypes.DATE,
            required: true,
        },{
            name: fields.runs.INSTRUMENT_ID,
            width: 2,
            label: "Machine",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.INSTRUMENTS,
        },{
            name: fields.runs.GA_RUN_DATE,
            width: 3,
            label: "Run Date",
            inputType: inputTypes.DATE,
            required: true,
        },{
            name: fields.runs.RUN_TYPES_LENGTH_ID,
            width: 3,
            label: "Run Input Type",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.RUN_TYPES_LENGTHS,
            required: true,
        },{
            name: fields.runs.FC_STAGE,
            width: 3,
            label: "Stage",
            inputType: inputTypes.DROPDOWN,
            hasNoneValue: false,
            options: [[1,'--'], [2,'A'], [3,'B']],
        },{
            name: fields.runs.SEQUENCING_KIT_VERSION_ID,
            width: 3,
            label: "Kit",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.SEQUENCING_KIT_VERSIONS,
            required: true,
        },{
            name: fields.runs.IS_FAILED,
            width: 2,
            label: "Run failed",
            inputType: inputTypes.CHECKBOX,
        },{
            name: fields.runs.COMMENT,
            width: 10,
            label: "Comment",
            inputType: inputTypes.TEXTAREA,
        }
    ],
    model: "runs"
};


export default runsModel;

