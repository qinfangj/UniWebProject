'use strict';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import fields from '../../../constants/fields';


const sampleModel = {
    [fields.samples.NAME]: {
        inputType: inputTypes.TEXT,
        label: "Sample name",
    },
    [fields.samples.SHORT_NAME]: {
        inputType: inputTypes.TEXT,
        label: "Short name",
    },
    [fields.samples.PROJECT_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.PROJECTS_ALL,
        label: "Project",
    },
    [fields.samples.TAXO_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.TAXONOMIES,
        label: "Organism",
    },
    [fields.samples.SAMPLE_TYPE_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.SAMPLE_TYPES,
        label: "Material type",
    },
    [fields.samples.RECEIVED_DATE]: {
        inputType: inputTypes.DATE,
        type: "date",
        label: "Received date",
    },
    [fields.samples.QUANTIF_METHOD_ID]: {
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.QUANTIF_METHODS,
        label: "Quantification",
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
    [fields.samples.COMMENT]: {
        inputType: inputTypes.TEXT,
        label: "Internal comment",
    },
    [fields.samples.IS_TRASHED]: {
        inputType: inputTypes.TEXT,
        label: "Discarded",
    },
};

export default sampleModel;

