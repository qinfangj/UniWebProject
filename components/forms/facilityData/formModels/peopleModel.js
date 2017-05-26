"use strict";
import fields from '../../fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators2';


const peopleModel = {
    [fields.FIRST_NAME]: {
        width: 4,
        label: "First name",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.LAST_NAME]: {
        width: 4,
        label: "Last name",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.EMAIL]: {
        width: 4,
        label: "PI email",
        inputType: inputTypes.TEXT,
        required: true,
        type: "email",
    },
    [fields.ADDRESS]: {
        width: 8,
        label: "PI address",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.PHONE]: {
        width: 4,
        label: "PI phone",
        inputType: inputTypes.TEXT,
        required: true,
        type: "phone",
    }
};


export default peopleModel;
