"use strict";
import fields from '../fields';
import formNames from '../../constants/formNames';
import { dateNow } from '../../../utils/time';
import inputTypes from '../inputTypes';
import { DEFAULT_DATE } from '../inputTypes';



function isValid(value, type, required, setValid) {
    let valid = true;
    if (required) {
        if (type === inputTypes.TEXT || type === inputTypes.TEXTAREA) {
            valid = value !== "";
        } else if (type === inputTypes.DROPDOWN || type === inputTypes.SEC_DROPDOWN) {
            valid = value !== -1;
        }
    } else {
        valid = setValid;
    }
    return valid;
}


export const facilityDataModels = Object.freeze({

    [formNames.BIOANALYSERS_INSERT_FORM]: {
        [fields.BIOANALYSER_FILE]: {
            label: "Bioanalysers file",
            type: inputTypes.TEXT,
            value: null,
        },
        [fields.BIOANALYSER_DATE]: {
            label: "Bioanalyser date",
            type: inputTypes.DATE,
            value: DEFAULT_DATE,
        },
        [fields.DESCRIPTION]: {
            label: "Description",
            type: inputTypes.TEXT,
            value: "",
        },
    },

    [formNames.PROJECTS_INSERT_FORM]: {
        [fields.NAME]: {
            label: "Project name",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.PERSON_ID]: {
            label: "Laboratory",
            type: inputTypes.DROPDOWN,
            value: -1,
            required: true,
        },
        [fields.CODE_NAME]: {
            label: "Code name",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.DESCRIPTION]: {
            label: "Description",
            type: inputTypes.TEXT,
            value: "",
        },
        [fields.PROJECT_STATE_ID]: {
            label: "Project state",
            type: inputTypes.DROPDOWN,
            value: -1,
            required: true,
        },
        [fields.IS_CONTROL]: {
            label: "Control project",
            type: inputTypes.CHECKBOX,
            value: false,
        },
        [fields.USER_MEETING_DATE]: {
            label: "User meeting date",
            type: inputTypes.DATE,
            value: DEFAULT_DATE,
        },
        [fields.PROJECT_ANALYSIS_ID]: {
            label: "Project analysis",
            type: inputTypes.DROPDOWN,
            value: -1,
            required: true,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: inputTypes.TEXTAREA,
            value: "",
        }
    },

    [formNames.SAMPLES_INSERT_FORM]: {
        [fields.NAME]: {
            label: "Name",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.SHORT_NAME]: {
            label: "Short name",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.PROJECT_ID]: {
            label: "Project",
            type: inputTypes.DROPDOWN,
            value: -1,
            required: true,
        },
        [fields.TAXO_ID]: {
            label: "Organism",
            type: inputTypes.DROPDOWN,
            value: -1,
            required: true,
        },
        [fields.SAMPLE_TYPE_ID]: {
            label: "Sample type",
            type: inputTypes.DROPDOWN,
            value: -1,
            required: true,
        },
        [fields.RECEIVED_DATE]: {
            label: "Received date",
            type: inputTypes.DATE,
            value: DEFAULT_DATE,
        },
        [fields.QUANTIF_METHOD_ID]: {
            label: "Quantification",
            type: inputTypes.DROPDOWN,
            value: -1,
            required: true,
        },
        [fields.CONCENTRATION]: {
            label: "Concentration",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.VOLUME]: {
            label: "Volume",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.RIN]: {
            label: "RIN",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.RATIO_260_280]: {
            label: "Ratio 260/280",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.RATIO_260_230]: {
            label: "Ratio 260/230",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.DESCRIPTION]: {
            label: "Description",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: inputTypes.TEXT,
            value: "",
        },
        [fields.COMMENT_CUSTOMER]: {
            label: "Internal comment",
            type: inputTypes.TEXTAREA,
            value: "",
        },
        [fields.IS_TRASHED]: {
            label: "Discarded",
            type: inputTypes.CHECKBOX,
            value: false,
        }
    },

    [formNames.USER_REQUESTS_INSERT_FORM]: {
        [fields.PROJECT_ID]: {
            label: "Project",
            type: inputTypes.DROPDOWN,
            value: -1,
            required: true,
        },
        [fields.SAMPLE_ID]: {
            label: "Sample",
            type: inputTypes.SEC_DROPDOWN,
            value: -1,
            required: true,
        },
        [fields.INSERT_SIZE_MIN]: {
            label: "Insert size min",
            type: inputTypes.TEXT,
            value: "",
        },
        [fields.INSERT_SIZE_MAX]: {
            label: "Insert size max",
            type: inputTypes.TEXT,
            value: "",
        },
        [fields.LIB_PROTOCOL_ID]: {
            label: "Library type",
            type: inputTypes.DROPDOWN,
            value: -1,
            required: true,
        },
        [fields.MULTIPLEXING_GROUP]: {
            label: "Multiplexing group",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.RUN_TYPES_LENGTH_ID]: {
            label: "Run type",
            type: inputTypes.DROPDOWN,
            value: -1,
            required: true,
        },
        [fields.NB_LANES]: {
            label: "Nb of lanes",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.MILLION_READS]: {
            label: "Multiplex#",
            type: inputTypes.TEXT,
            value: "",
            required: true,
        },
        [fields.WITH_LIB_QC]: {
            label: "is QC",
            type: inputTypes.CHECKBOX,
            value: false,
        },
        [fields.COMMENT]: {
            label: "Comment",
            type: inputTypes.TEXTAREA,
            value: "",
        },
        [fields.IS_TRASHED]: {
            label: "Discarded",
            type: inputTypes.CHECKBOX,
            value: false,
        },
        [fields.IS_FULFILLED]: {
            label: "DONE",
            type: inputTypes.CHECKBOX,
            value: false,
        }
    },
});


export function initFacilityData() {
    let initialData = {};
    for (let form of Object.keys(formNames)) {
        initialData[form] = {};
        initialData[form]._isValid = {};
    }
    for (let form of Object.keys(facilityDataModels)) {
        let fields = Object.keys(facilityDataModels[form]);
        for (let field of fields) {
            let model = facilityDataModels[form][field];
            let value = model.value;
            let setValid = model.valid;
            let required = model.required;
            let type = model.type;
            initialData[form][field] = value;
            initialData[form]._isValid[field] = isValid(value, type, required, setValid);
        }
    }
    return Object.freeze(initialData);
}

