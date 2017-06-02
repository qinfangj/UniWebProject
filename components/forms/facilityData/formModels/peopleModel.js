"use strict";
import fields from '../../fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators2';


const peopleModel = {
    [fields.people.FIRST_NAME]: {
        width: 4,
        label: "First name",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.people.LAST_NAME]: {
        width: 4,
        label: "Last name",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.people.EMAIL]: {
        width: 4,
        label: "PI email",
        inputType: inputTypes.TEXT,
        required: true,
        type: "email",
    },
    [fields.people.ADDRESS]: {
        width: 8,
        label: "PI address",
        inputType: inputTypes.TEXT,
        required: true,
    },
    [fields.people.PHONE]: {
        width: 4,
        label: "PI phone",
        inputType: inputTypes.TEXT,
        required: true,
        type: "tel",
    }
};


export default peopleModel;
