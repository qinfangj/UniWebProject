"use strict";
import actions from '../actionTypes';


export function changeFormValue(form, field, value, valid) {
    return {
        type: actions.forms.CHANGE_FORM_VALUE,
        form: form,
        field: field,
        value: value,
        valid: valid,
    }
}

export function emptyForm(form) {
    return {
        type: actions.forms.EMPTY_FORM,
        form: form,
    }
}
