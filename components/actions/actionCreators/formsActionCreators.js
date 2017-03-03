"use strict";
import actions from '../actionTypes';


export function changeFormValue(form, field, value, valid) {
    return {
        type: actions.CHANGE_FORM_VALUE,
        form: form,
        field: field,
        value: value,
        valid: valid,
    }
}

export function emptyForm(form) {
    return {
        type: actions.facilityData.EMPTY_FORM,
        form: form,
    }
}