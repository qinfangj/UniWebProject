"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators';


const bioanalysersModel = {
    [fields.bioanalysers.BIOANALYSER_DATE]: {
        width: 3,
        label: "Bioanalyser date",
        inputType: inputTypes.DATE,
    },
    "spacer": {
        width: 4,
        inputType: inputTypes.BLANK,
    },
    [fields.bioanalysers.DESCRIPTION]: {
        width: 12,
        label: "Description",
        inputType: inputTypes.TEXT,
    },
};


export default bioanalysersModel;
