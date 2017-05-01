"use strict";
import fields from '../../fields';
// import formNames from '../../../constants/formNames';
import { dateNow } from '../../../../utils/time';
import inputTypes from '../../inputTypes';
// import { DEFAULT_DATE } from '../../inputTypes';



const runsModel = {
    [fields.RUN_NUMBER]: {
        width: 1,
        label: "Run#",
        type: inputTypes.TEXT,
        value: "122",
        required: true,
    },
    [fields.FLOWCELL_ID]: {
        width: 2,
        label: "Flowcell ID",
        type: inputTypes.TEXT,
        value: "",
        required: true,
    },
    [fields.PIPELINE_VERSION_ID]: {
        width: 1,
        label: "Version",
        type: inputTypes.DROPDOWN,
        value: -1,
        required: false,
    },
    [fields.CLUSTER_DATE]: {
        width: 3,
        label: "Cluster Date",
        type: inputTypes.DATE,
        value: dateNow(),
        required: true,
    },
    [fields.INSTRUMENT_ID]: {
        width: 3,
        label: "Machine",
        type: inputTypes.DROPDOWN,
        value: -1,
        required: false,
    },
    [fields.RUN_DATE]: {
        width: 2,
        label: "Run Date",
        type: inputTypes.DATE,
        value: dateNow(),
        required: true,
    },

    /* Mini sub-form on the left, sharing 4 width units on the left */
    [fields.RUN_TYPES_LENGTH_ID]: {
        width: 12,
        label: "Run type",
        type: inputTypes.DROPDOWN,
        value: -1,
    },
    [fields.STAGE]: {
        width: 4,
        label: "Stage",
        type: inputTypes.DROPDOWN,
        value: -1,
        options: [[1,'--'], [2,'A'], [3,'B']],
    },
    [fields.SEQUENCING_KIT_VERSION_ID]: {
        width: 4,
        label: "Kit",
        type: inputTypes.DROPDOWN,
        value: -1,
    },
    [fields.IS_FAILED]: {
        width: 4,
        label: "Run failed",
        type: inputTypes.CHECKBOX,
        value: -1,
    },

    /* Comment, using 8 units on the right */
    [fields.COMMENT]: {
        width: 8,
        label: "Comment",
        type: inputTypes.TEXTAREA,
        value: "",
    },

};

export default runsModel;

