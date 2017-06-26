'use strict';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import fields from '../../../constants/fields';
import validators from '../../validators2';


const samplesModel = {
    [fields.samples.NAME]: {
        width: 4,
        inputType: inputTypes.TEXT,
        label: "Name",
        validators: {mediumString: validators.mediumStringValidator},
        errorMessages: {mediumString: "0-30 characters."},
        required: true,
    },
    [fields.samples.SHORT_NAME]: {
        width: 3,
        inputType: inputTypes.TEXT,
        label: "Short name",
        validators: {mediumString: validators.shortStringValidator},
        errorMessages: {mediumString: "2-10 characters."},
        required: true,
    },
    [fields.samples.PROJECT_ID]: {
        width: 5,
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PROJECTS_ALL,
        label: "Project",
        required: true,
    },
    [fields.samples.TAXO_ID]: {
        width: 3,
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.TAXONOMIES,
        label: "Organism",
        required: true,
    },
    [fields.samples.SAMPLE_TYPE_ID]: {
        width: 3,
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.SAMPLE_TYPES,
        label: "Material type",
        required: true,
    },
    [fields.samples.RECEIVED_DATE]: {
        width: 3,
        inputType: inputTypes.DATE,
        type: "date",
        label: "Received date",
        required: true,
    },
    [fields.samples.QUANTIF_METHOD_ID]: {
        width: 3,
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.QUANTIF_METHODS,
        label: "Quantification",
        required: true,
    },
    [fields.samples.CONCENTRATION]: {
        width: 3,
        inputType: inputTypes.TEXT,
        type: "number",
        label: "Conc.[ng/μl]",
        required: true,
    },
    [fields.samples.VOLUME]: {
        width: 3,
        inputType: inputTypes.TEXT,
        type: "number",
        label: "Vol.[μl]",
        required: true,
    },
    [fields.samples.RIN]: {
        width: 2,
        inputType: inputTypes.TEXT,
        type: "number",
        label: "RIN",
        required: true,
    },
    [fields.samples.RATIO_260_280]: {
        width: 2,
        inputType: inputTypes.TEXT,
        type: "number",
        label: "Ratio 260/280",
    },
    [fields.samples.RATIO_260_230]: {
        width: 2,
        inputType: inputTypes.TEXT,
        type: "number",
        label: "Ratio 260/230",
    },
    [fields.samples.DESCRIPTION]: {
        width: 12,
        inputType: inputTypes.TEXT,
        label: "General description",
    },
    [fields.samples.COMMENT_CUSTOMER]: {
        width: 12,
        inputType: inputTypes.TEXTAREA,
        label: "Comment",
    },
    [fields.samples.COMMENT]: {
        width: 10,
        inputType: inputTypes.TEXT,
        label: "Internal comment",
    },
    [fields.samples.IS_TRASHED]: {
        width: 2,
        inputType: inputTypes.CHECKBOX,
        label: "Discarded",
    },
};

export default samplesModel;

