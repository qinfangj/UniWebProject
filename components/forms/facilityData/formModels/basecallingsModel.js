"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../../constants/inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators';


const basecallingsModel = {
    fields: [
        {
            name: fields.RUN_ID,
            width: 5,
            label: "Run",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.RUNS_OUTPUT_FOLDERS,
            required: true,
        },{
            name: fields.PIPELINE_VERSION_ID,
            width: 3,
            label: "Pipeline version",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.PIPELINE_VERSIONS,
            required: true,
        },{
            name: fields.ANALYSIS_TYPE_ID,
            width: 2,
            label: "Analysis type",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.PIPELINE_ANALYSIS_TYPES,
            required: true,
        },{
            name: fields.CONTROL_LANE_NB,
            width: 2,
            label: "Control lane",
            inputType: inputTypes.DROPDOWN,
            type: "number",
            options: [[0,'None'], [1,'1'], [2,'2'], [3,'3'], [4,'4'], [5,'5'], [6,'6'], [7,'7'], [8,'8']],
            hasNoneValue: false,
        },{
            name: fields.UNALIGNED_OUTPUT_DIR,
            width: 10,
            label: "Unaligned data output folder",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.IS_DEMULTIPLEXING,
            width: 2,
            label: "Demultiplexing",
            inputType: inputTypes.CHECKBOX,
            style: {marginTop: "34px"},
        },{
            name: fields.COMMENT,
            width: 12,
            label: "Comment",
            inputType: inputTypes.TEXTAREA,
        }
    ],
    model: "basecallings"
};


export default basecallingsModel;
