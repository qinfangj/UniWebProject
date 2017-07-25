'use strict';
import inputTypes from '../../../constants/inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import fields from '../../../constants/fields';
import validators from '../../validators';


const samplesModel = {
    fields: [
        {
            name: fields.samples.NAME,
            width: 4,
            inputType: inputTypes.TEXT,
            label: "Name",
            validators: {mediumString: validators.mediumStringValidator},
            errorMessages: {mediumString: "0-30 characters."},
            required: true,
        },{
            name: fields.samples.SHORT_NAME,
            width: 3,
            inputType: inputTypes.TEXT,
            label: "Short name",
            validators: {mediumString: validators.shortStringValidator},
            errorMessages: {mediumString: "2-10 characters."},
            required: true,
        },{
            name: fields.samples.PROJECT_ID,
            width: 5,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.PROJECTS_ALL,
            label: "Project",
            required: true,
        },{
            name: fields.samples.TAXO_ID,
            width: 3,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.TAXONOMIES,
            label: "Organism",
            required: true,
        },{
            name: fields.samples.SAMPLE_TYPE_ID,
            width: 3,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.SAMPLE_TYPES,
            label: "Material type",
            required: true,
        },{
            name: fields.samples.RECEIVED_DATE,
            width: 3,
            inputType: inputTypes.DATE,
            type: "date",
            label: "Received date",
        },{
            name: fields.samples.QUANTIF_METHOD_ID,
            width: 3,
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.QUANTIF_METHODS,
            label: "Quantification",
            required: true,
        },{
            name: fields.samples.CONCENTRATION,
            width: 3,
            inputType: inputTypes.TEXT,
            type: "number",
            label: "Conc.[ng/μl]",
            required: true,
        },{
            name: fields.samples.VOLUME,
            width: 3,
            inputType: inputTypes.TEXT,
            type: "number",
            label: "Vol.[μl]",
            required: true,
        },{
            name: fields.samples.RIN,
            width: 2,
            inputType: inputTypes.TEXT,
            type: "number",
            label: "RIN",
        },{
            name: fields.samples.RATIO_260_280,
            width: 2,
            inputType: inputTypes.TEXT,
            type: "number",
            label: "Ratio 260/280",
        },{
            name: fields.samples.RATIO_260_230,
            width: 2,
            inputType: inputTypes.TEXT,
            type: "number",
            label: "Ratio 260/230",
        },{
            name: fields.samples.DESCRIPTION,
            width: 12,
            inputType: inputTypes.TEXT,
            label: "General description",
            placeholder: "e.g. 'Crosslinked ChIP DNA from NIH-3T3 cells'",
            validators: {desc: validators.descriptionValidator},
            errorMessages: {desc: "Description must be at least 3 words."},
            required: true,
        },{
            name: fields.samples.COMMENT_CUSTOMER,
            width: 12,
            inputType: inputTypes.TEXTAREA,
            label: "Comment",
        },{
            name: fields.samples.COMMENT,
            width: 10,
            inputType: inputTypes.TEXT,
            label: "Internal comment",
        },{
            name: fields.samples.IS_TRASHED,
            width: 2,
            inputType: inputTypes.CHECKBOX,
            label: "Discarded",
        }
    ],
    model: "samples"
};

export default samplesModel;

