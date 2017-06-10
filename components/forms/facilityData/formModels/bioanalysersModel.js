"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators2';


const bioanalysersModel = {
    [fields.bioanalysers.BIOANALYSER_FILE]: {
        width: 4,
        label: "Bioanalyser file",   // "Replace ..." if insert
        inputType: inputTypes.TEXT,
        type: "file",
        required: true,
    },
    [fields.bioanalysers.BIOANALYSER_DATE]: {
        width: 3,
        label: "Bioanalyser date",
        inputType: inputTypes.DATE,
    },
    "spacer": {
        width: 5,
        inputType: inputTypes.BLANK,
    },
    [fields.bioanalysers.DESCRIPTION]: {
        width: 12,
        label: "Description",
        inputType: inputTypes.TEXT,
    },
};


export default bioanalysersModel;
