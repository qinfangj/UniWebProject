'use strict';
import inputTypes from '../../../constants/inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import fields from '../../../constants/fields';


const librariesProjectModel = {
    fields: [
        {
            name: fields.libraries.PROJECT_ID,
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
            name: fields.libraries.LIB_PROTOCOL_ID,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.LIB_PROTOCOLS,
            label: "Library protocol",
            required: true,
        },{
            name: fields.libraries.ADAPTER_ID,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.LIB_ADAPTERS,
            label: "Adapters",
            required: true,
        },{
            name: fields.libraries.LIBRARY_DATE,
            inputType: inputTypes.DATE,
            type: "date",
            label: "Library date",
            required: true,
        },{
            name: fields.libraries.QUANTIF_METHOD_ID,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.QUANTIF_METHODS,
            label: "Quantification",
            required: true,
        },{
            name: fields.libraries.IS_ROBOT_MADE,
            inputType: inputTypes.CHECKBOX,
            label: "Made on robot",
        },

        // Request

        {
            name: fields.user_requests.RUN_TYPES_LENGTH_ID,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.RUN_TYPES_LENGTHS,
            label: "Sequencing type",
            required: true,
        },
    ],

    model: "librariesProject",
};

export default librariesProjectModel;

