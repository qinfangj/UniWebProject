"use strict";
import fields from '../../fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators2';


const genomesModel = {
    [fields.TAXO_ID]: {
        width: 4,
        label: "Organism",
        inputType: inputTypes.DROPDOWN,
        optionsKey: optionsStoreKeys.TAXONOMIES,
        required: true,
    },
    [fields.ASSEMBLY]: {
        width: 4,
        label: "Assembly",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.GENOME_FOLDER]: {
        width: 4,
        label: "Genome folder",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.URL]: {
        width: 8,
        label: "URL",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.DOWNLOADED_DATE]: {
        width: 4,
        label: "Download date",
        inputType: inputTypes.DATE,
    },
    [fields.FILES]: {
        width: 12,
        label: "File names",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.COMMENT]: {
        width: 10,
        label: "Comment",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.IS_MASKED]: {
        width: 2,
        label: "Masked",
        inputType: inputTypes.CHECKBOX,
    },
    [fields.IS_ARCHIVED]: {
        width: 2,
        label: "Archived",
        inputType: inputTypes.CHECKBOX,
    }
};


export default genomesModel;

