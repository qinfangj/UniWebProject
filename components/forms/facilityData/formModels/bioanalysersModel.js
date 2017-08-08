"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../../constants/inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators';


const bioanalysersModel = {
    fields: [
        {
            name: fields.bioanalysers.BIOANALYSER_DATE,
            width: 3,
            label: "Bioanalyser date",
            inputType: inputTypes.DATE,
        },{
            name: "spacer",
            width: 4,
            inputType: inputTypes.BLANK,
        },{
            name: fields.bioanalysers.DESCRIPTION,
            width: 12,
            label: "Description",
            inputType: inputTypes.TEXT,
        },
    ],
    model: "bioanalysers"
};


export default bioanalysersModel;
