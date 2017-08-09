'use strict';
import inputTypes from '../../../constants/inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import fields from '../../../constants/fields';


const samplesProjectModel = {
    fields: [
        {
            name: fields.samples.PROJECT_ID,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.PROJECTS_ALL,
            label: "Project",
            required: true,
        },{
            name: fields.samples.TAXO_ID,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.TAXONOMIES,
            label: "Organism",
            required: true,
        },{
            name: fields.samples.SAMPLE_TYPE_ID,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.SAMPLE_TYPES,
            label: "Material type",
            required: true,
        },{
            name: fields.samples.RECEIVED_DATE,
            inputType: inputTypes.DATE,
            type: "date",
            label: "Received date",
            required: true,
        },{
            name: fields.samples.QUANTIF_METHOD_ID,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.QUANTIF_METHODS,
            label: "Quantification",
            required: true,
        },

        // Request

        {
            name: fields.user_requests.LIB_PROTOCOL_ID,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.LIB_PROTOCOLS,
            label: "Library type",
            required: true,
        },{
            name: fields.user_requests.RUN_TYPES_LENGTH_ID,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.RUN_TYPES_LENGTHS,
            label: "Sequencing type",
            required: true,
        },
    ],

    model: "samplesProject",
};

export default samplesProjectModel;

