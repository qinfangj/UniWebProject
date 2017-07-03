'use strict';
import inputTypes from '../../forms/inputTypes';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import fields from '../../constants/fields';


export const sampleFields = [
    fields.samples.NAME, fields.samples.SHORT_NAME, fields.samples.CONCENTRATION,
    fields.samples.VOLUME, fields.samples.RIN, fields.samples.RATIO_260_280, fields.samples.RATIO_260_230,
    fields.samples.DESCRIPTION, fields.samples.COMMENT_CUSTOMER,
    fields.user_requests.INSERT_SIZE_MIN, fields.user_requests.INSERT_SIZE_MAX,
    fields.user_requests.NB_LANES, fields.user_requests.MILLION_READS, fields.user_requests.MULTIPLEXING_GROUP,
];

const sampleModel = {
    [fields.samples.NAME]: {
        inputType: inputTypes.TEXT,
        label: "Sample name",
        required: true,
    },
    [fields.samples.SHORT_NAME]: {
        inputType: inputTypes.TEXT,
        label: "Short name",
        required: true,
    },
    [fields.samples.CONCENTRATION]: {
        inputType: inputTypes.NUMBER,
        label: "Conc.[ng/μl]",
        required: true,
    },
    [fields.samples.VOLUME]: {
        inputType: inputTypes.NUMBER,
        label: "Vol.[μl]",
        required: true,
    },
    [fields.samples.RIN]: {
        inputType: inputTypes.NUMBER,
        label: "RIN",
        required: true,
    },
    [fields.samples.RATIO_260_280]: {
        inputType: inputTypes.NUMBER,
        label: "Ratio 260/280",
        required: true,
    },
    [fields.samples.RATIO_260_230]: {
        inputType: inputTypes.NUMBER,
        label: "Ratio 260/230",
        required: true,
    },
    [fields.samples.DESCRIPTION]: {
        inputType: inputTypes.TEXT,
        label: "General description",
        required: true,
    },
    [fields.samples.COMMENT_CUSTOMER]: {
        inputType: inputTypes.TEXT,
        label: "Comment",
    },

    // Request

    [fields.user_requests.INSERT_SIZE_MIN]: {
        inputType: inputTypes.NUMBER,
        label: "Insert size min.",
        required: true,
    },
    [fields.user_requests.INSERT_SIZE_MAX]: {
        inputType: inputTypes.NUMBER,
        label: "Insert size max.",
        required: true,
    },
    [fields.user_requests.NB_LANES]: {
        inputType: inputTypes.NUMBER,
        label: "Nb of lanes",
        required: true,
    },
    [fields.user_requests.MILLION_READS]: {
        inputType: inputTypes.NUMBER,
        label: "Multiplex#",
        required: true,
    },
    [fields.user_requests.MULTIPLEXING_GROUP]: {
        inputType: inputTypes.TEXT,
        label: "Multiplexing group",
    },
};

export default sampleModel;

