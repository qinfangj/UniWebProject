'use strict';
import inputTypes from '../../forms/inputTypes';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import fields from '../../constants/fields';


const sampleModel = {
    [fields.samples.NAME]: {
        inputType: inputTypes.TEXT,
        label: "Sample name",
    },
    [fields.samples.SHORT_NAME]: {
        inputType: inputTypes.TEXT,
        label: "Short name",
    },
    [fields.samples.CONCENTRATION]: {
        inputType: inputTypes.NUMBER,
        label: "Conc.[ng/μl]"
    },
    [fields.samples.VOLUME]: {
        inputType: inputTypes.NUMBER,
        label: "Vol.[μl]",
    },
    [fields.samples.RIN]: {
        inputType: inputTypes.NUMBER,
        label: "RIN",
    },
    [fields.samples.RATIO_260_280]: {
        inputType: inputTypes.NUMBER,
        label: "Ratio 260/280",
    },
    [fields.samples.RATIO_260_230]: {
        inputType: inputTypes.NUMBER,
        label: "Ratio 260/230",
    },
    [fields.samples.DESCRIPTION]: {
        inputType: inputTypes.TEXT,
        label: "General description",
    },
    [fields.samples.COMMENT_CUSTOMER]: {
        inputType: inputTypes.TEXT,
        label: "Comment",
    },

    // Request

    [fields.user_requests.INSERT_SIZE_MIN]: {
        inputType: inputTypes.NUMBER,
        label: "Insert size min.",
    },
    [fields.user_requests.INSERT_SIZE_MIN]: {
        inputType: inputTypes.NUMBER,
        label: "Insert size max.",
    },
    [fields.user_requests.NB_LANES]: {
        inputType: inputTypes.NUMBER,
        label: "Nb of lanes",
    },
    [fields.user_requests.MILLION_READS]: {
        inputType: inputTypes.NUMBER,
        label: "Multiplex#",
    },
    [fields.user_requests.MULTIPLEXING_GROUP]: {
        inputType: inputTypes.TEXT,
        label: "Multiplexing group",
    },
};

export default sampleModel;

