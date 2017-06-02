'use strict';
import inputTypes from '../../forms/inputTypes';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import fields from '../../constants/fields';


const libraryModel = {
    [fields.samples.NAME]: {
        inputType: inputTypes.TEXT,
        label: "Sample name",
    },
    [fields.samples.SHORT_NAME]: {
        inputType: inputTypes.TEXT,
        label: "Short name",
    },
    [fields.libraries.STARTING_MATERIAL]: {
        inputType: inputTypes.TEXT,
        label: "Starting material",
    },
    [fields.libraries.MULTIPLEX_INDEX_7_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.MULTIPLEX_INDEXES,
        label: "Multiplex index (I7)",
    },
    [fields.libraries.MULTIPLEX_INDEX_5_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.MULTIPLEX_INDEXES,
        label: "Multiplex index (I5)",
    },
    [fields.libraries.FRAG_SIZE_MIN]: {
        inputType: inputTypes.NUMBER,
        label: "Min frag. size",
    },
    [fields.libraries.FRAG_SIZE_MAX]: {
        inputType: inputTypes.NUMBER,
        label: "Max frag. size",
    },
    [fields.libraries.BIOANALYSER_PEAK]: {
        inputType: inputTypes.NUMBER,
        label: "Bioanalyser peak",
    },
    [fields.libraries.CONCENTRATION]: {
        inputType: inputTypes.NUMBER,
        label: "Conc.[ng/μl]"
    },
    [fields.libraries.VOLUME]: {
        inputType: inputTypes.NUMBER,
        label: "Vol.[μl]",
    },
    [fields.libraries.COMMENT]: {
        inputType: inputTypes.TEXT,
        label: "Comment",
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

export default libraryModel;

