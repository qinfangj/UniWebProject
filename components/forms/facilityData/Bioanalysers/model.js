"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators2';


// const intValidator = {isInteger: validators.integerValidator};


const bionalysersModel = {
    [fields.bioanalysers.BIOANALYSER_FILE]: {
        label: "Bioanalysers file",
        inputType: inputTypes.TEXT,
        type: "file",
        required: true,
    },
    [fields.bioanalysers.BIOANALYSER_DATE]: {
        label: "Bioanalyser date",
        inputType: inputTypes.DATE,
        required: true,
    },
    [fields.bioanalysers.DESCRIPTION]: {
        label: "Description",
        inputType: inputTypes.TEXT,
    },
};


export default bionalysersModel;

