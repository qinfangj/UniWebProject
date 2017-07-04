"use strict";
import fields from '../../constants/fields';
import formNames from '../../constants/formNames';
import { dateNow } from '../../../utils/time';
import inputTypes from '../inputTypes';
import { DEFAULT_DATE } from '../inputTypes';



function isValid(value, type, required, setValid) {
    let valid = true;
    if (required) {
        if (type === inputTypes.TEXT || type === inputTypes.TEXTAREA) {
            valid = value !== "";
        } else if (type === inputTypes.DROPDOWN || type === inputTypes.SEC_DROPDOWN) {
            valid = value !== -1;
        }
    } else {
        valid = setValid;
    }
    return valid;
}


export function initFacilityData() {
    let initialData = {};
    for (let form of Object.keys(formNames)) {
        initialData[form] = {};
        initialData[form]._isValid = {};
    }
    for (let form of Object.keys(facilityDataModels)) {
        let fields = Object.keys(facilityDataModels[form]);
        for (let field of fields) {
            let model = facilityDataModels[form][field];
            let value = model.value;
            let setValid = model.valid;
            let required = model.required;
            let type = model.type;
            initialData[form][field] = value;
            initialData[form]._isValid[field] = isValid(value, type, required, setValid);
        }
    }
    return Object.freeze(initialData);
}

