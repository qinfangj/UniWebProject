"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../../constants/inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators';


const genomesModel = {
    fields: [
        {
            name: fields.genomes.TAXO_ID,
            width: 4,
            label: "Organism",
            inputType: inputTypes.DROPDOWN,
            optionsKey: optionsStoreKeys.TAXONOMIES,
            required: true,
        },{
            name: fields.genomes.ASSEMBLY,
            width: 4,
            label: "Assembly",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.genomes.GENOME_FOLDER,
            width: 4,
            label: "Genome folder",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.genomes.URL,
            width: 8,
            label: "URL",
            inputType: inputTypes.TEXT,
            required: true,
            type: "url",
        },{
            name: fields.genomes.DOWNLOADED_DATE,
            width: 4,
            label: "Download date",
            inputType: inputTypes.DATE,
        },{
            name: fields.genomes.FILES,
            width: 12,
            label: "File names",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.genomes.COMMENT,
            width: 10,
            label: "Comment",
            inputType: inputTypes.TEXT,
        },{
            name: fields.genomes.IS_MASKED,
            width: 2,
            label: "Masked",
            inputType: inputTypes.CHECKBOX,
            style: {marginTop: "10px", marginLeft: "10px"},
        },{
            name: fields.genomes.IS_ARCHIVED,
            width: 2,
            label: "Archived",
            inputType: inputTypes.CHECKBOX,
            style: {marginLeft: "10px"},
        }
    ],
    model: "genomes"
};


export default genomesModel;

