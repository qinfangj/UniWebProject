"use strict";
import fields from '../../../constants/fields';
// import formNames from '../../../constants/formNames';
import inputTypes from '../../../constants/inputTypes';
import optionsStoreKeys from '../../../constants/optionsStoreKeys';
import validators from '../../validators';


const peopleModel = {
    fields: [
        {
            name: fields.people.FIRST_NAME,
            width: 4,
            label: "First name",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.people.LAST_NAME,
            width: 4,
            label: "Last name",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.people.EMAIL,
            width: 4,
            label: "PI email",
            inputType: inputTypes.TEXT,
            required: true,
            type: "email",
        },{
            name: fields.people.ADDRESS,
            width: 8,
            label: "PI address",
            inputType: inputTypes.TEXT,
            required: true,
        },{
            name: fields.people.PHONE,
            width: 4,
            label: "PI phone",
            inputType: inputTypes.TEXT,
            required: true,
            type: "tel",
        }
    ],
    model: "people"
};


export default peopleModel;
