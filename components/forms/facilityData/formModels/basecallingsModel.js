"use strict";
import fields from '../../fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators2';


const basecallingsModel = {
    [fields.RUN_ID]: {
        width: 5,
        label: "Run",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.RUNS_OUTPUT_FOLDERS,
        required: true,
    },
    [fields.PIPELINE_VERSION_ID]: {
        width: 3,
        label: "Pipeline version",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PIPELINE_VERSIONS,
        required: true,
    },
    [fields.ANALYSIS_TYPE_ID]: {
        width: 2,
        label: "Analysis type",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PIPELINE_ANALYSIS_TYPES,
        required: true,
    },
    [fields.CONTROL_LANE_NB]: {
        width: 2,
        label: "Control lane",
        inputType: inputTypes.DROPDOWN,
        type: "number",
        options: [[0,'No'], [1,'1'], [2,'2'], [3,'3'], [4,'4'], [5,'5'], [6,'6'], [7,'7'], [8,'8']],
},
    [fields.IS_DEMULTIPLEXING]: {
        width: 2,
        label: "Demultiplexing",
        inputType: inputTypes.CHECKBOX,
    },
    [fields.UNALIGNED_OUTPUT_DIR]: {
        width: 10,
        label: "Unaligned data output folder",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.COMMENT]: {
        width: 12,
        label: "Comment",
        inputType: inputTypes.TEXTAREA,
    }
};


export default basecallingsModel;
