"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators';



const userRequestsModel = {
    fields: [
        {
            name: fields.user_requests.PROJECT_ID,
            width: 5,
            label: "Project",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE,
            required: true,
        },{
            name: fields.user_requests.SAMPLE_ID,
            width: 3,
            label: "Sample",
            inputType: inputTypes.SEC_DROPDOWN,
            optionsKey: optionsStoreKeys.SAMPLES_FOR_PROJECT,
            refModelName: "facilityDataForms.user_requests." + fields.PROJECT_ID,
            required: true,
        },{
            name: fields.user_requests.INSERT_SIZE_MIN,
            width: 2,
            label: "Insert size min",
            inputType: inputTypes.TEXT,
            type: "number",
            validators: {isInteger: validators.integerValidator},
            errorMessages: {isInteger: "Must be an integer."},
        },{
            name: fields.user_requests.INSERT_SIZE_MAX,
            width: 2,
            label: "Insert size max",
            inputType: inputTypes.TEXT,
            type: "number",
            validators: {isInteger: validators.integerValidator},
            errorMessages: {isInteger: "Must be an integer."},
        },{
            name: fields.user_requests.LIB_PROTOCOL_ID,
            width: 2,
            label: "Library type",
            optionsKey: optionsStoreKeys.LIB_PROTOCOLS,
            inputType: inputTypes.DROPDOWN,
            required: true,
        },{
            name: fields.user_requests.MULTIPLEXING_GROUP,
            width: 2,
            label: "Multiplexing group",
            inputType: inputTypes.TEXT,
            validators: {mediumString: validators.shortStringValidator},
            errorMessages: {mediumString: "2-10 characters."},
        },{
            name: fields.user_requests.RUN_TYPES_LENGTH_ID,
            width: 2,
            label: "Run type",   // "Run request"
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.RUN_TYPES_LENGTHS,
            required: true,
        },{
            name: fields.user_requests.NB_LANES,
            width: 2,
            label: "Number of lanes",
            inputType: inputTypes.TEXT,
            type: "number",
            validators: {isInteger: validators.integerValidator},
            errorMessages: {isInteger: "Must be an integer."},
            required: true,
        },{
            name: fields.user_requests.MILLION_READS,
            width: 2,
            label: "Multiplex#",
            inputType: inputTypes.TEXT,
            type: "number",
            validators: {isInteger: validators.integerValidator},
            errorMessages: {isInteger: "Must be an integer."},
        },{
            name: fields.user_requests.WITH_LIB_QC,
            width: 2,
            label: "Is QC",
            inputType: inputTypes.CHECKBOX,
        },{
            name: fields.user_requests.COMMENT,
            width: 10,
            label: "Comment",
            inputType: inputTypes.TEXTAREA,
        },{
            name: fields.user_requests.IS_TRASHED,
            width: 2,
            label: "Discarded",
            inputType: inputTypes.CHECKBOX,
        },{
            name: fields.user_requests.IS_FULFILLED,
            width: 2,
            label: "DONE",
            inputType: inputTypes.CHECKBOX,
        }
    ],
    model: "user_requests"
};


export default userRequestsModel;

