'use strict';
import inputTypes from '../../forms/inputTypes';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import fields from '../../constants/fields';


export const libraryFields = [
    fields.samples.NAME, fields.samples.SHORT_NAME, fields.libraries.STARTING_MATERIAL,
    fields.libraries.MULTIPLEX_INDEX_7_ID, fields.libraries.MULTIPLEX_INDEX_5_ID,
    fields.libraries.FRAG_SIZE_MIN, fields.libraries.FRAG_SIZE_MAX,
    fields.libraries.BIOANALYSER_PEAK, fields.libraries.CONCENTRATION, fields.libraries.VOLUME,
    fields.libraries.COMMENT,
    fields.user_requests.NB_LANES, fields.user_requests.MILLION_READS, fields.user_requests.MULTIPLEXING_GROUP,
];

const libraryModel = {
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
    [fields.libraries.STARTING_MATERIAL]: {
        inputType: inputTypes.TEXT,
        label: "Starting material",
        required: true,
    },
    [fields.libraries.MULTIPLEX_INDEX_7_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.MULTIPLEX_INDEXES,
        label: "Multiplex index (I7)",
        required: true,
    },
    [fields.libraries.MULTIPLEX_INDEX_5_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.MULTIPLEX_INDEXES,
        label: "Multiplex index (I5)",
        required: true,
    },
    [fields.libraries.FRAG_SIZE_MIN]: {
        inputType: inputTypes.NUMBER,
        label: "Min frag. size",
        required: true,
    },
    [fields.libraries.FRAG_SIZE_MAX]: {
        inputType: inputTypes.NUMBER,
        label: "Max frag. size",
        required: true,
    },
    [fields.libraries.BIOANALYSER_PEAK]: {
        inputType: inputTypes.NUMBER,
        label: "Bioanalyser peak",
        required: true,
    },
    [fields.libraries.CONCENTRATION]: {
        inputType: inputTypes.NUMBER,
        label: "Conc.[ng/μl]",
        required: true,
    },
    [fields.libraries.VOLUME]: {
        inputType: inputTypes.NUMBER,
        label: "Vol.[μl]",
        required: true,
    },
    [fields.libraries.COMMENT]: {
        inputType: inputTypes.TEXT,
        label: "Comment",
    },

    // Request

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

export default libraryModel;

