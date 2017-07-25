"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../../constants/inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators';


const alignmentsModel = {
    fields: [
        {
            name: fields.ANALYSIS_TYPE_ID,
            width: 2,
            label: "Analysis type",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.PIPELINE_ANALYSIS_TYPES,
            required: true,
        },{  // "runs_output_folders"
            name: fields.RUN_ID,
            width: 5,
            label: "Run",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.RUNS_OUTPUT_FOLDERS,
            required: true,
        },{  // "basecallings_output_folders",
            name: fields.BASECALLING_ID,
            width: 5,
            label: "Unaligned data output folder",
            inputType: inputTypes.SEC_DROPDOWN,
            refModelName: "facilityDataForms.alignments." + fields.RUN_ID,
            optionsKey: optionsStoreKeys.BASECALLINGS_OUTPUT_FOLDERS_FOR_RUN,
            required: true,
        },{
            name: fields.MAPPING_TOOL_ID,
            width: 2,
            label: "Mapping tool",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.MAPPING_TOOLS,
            required: true,
        },{
            name: fields.ELAND_OUTPUT_DIR,
            width: 8,
            label: "Alignment output folder",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.HAS_QC_PDFS,
            width: 2,
            label: "QC report",
            inputType: inputTypes.CHECKBOX,
        },{
            name: fields.CONFIG_FILE_CONTENT,
            width: 12,
            label: "Config file content",
            inputType: inputTypes.TEXTAREA,
        },{
            name: fields.COMMENT,
            width: 12,
            label: "Comment",
            inputType: inputTypes.TEXTAREA,
        }
    ],
    model: "alignments"
};


export default alignmentsModel;
