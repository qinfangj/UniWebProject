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