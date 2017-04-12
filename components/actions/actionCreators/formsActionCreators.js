"use strict";
import types from '../actionTypes';
import RestService from '../../../utils/RestService';
import { assertStoreKey, asyncAction } from './base';


export function changeFormValue(form, field, value, valid) {
    return (dispatch) => {
        return dispatch({
            type: types.forms.CHANGE_FORM_VALUE,
            form: form,
            field: field,
            value: value,
            valid: valid,
        });
    };
}

export function resetForm(form) {
    return {
        type: types.forms.RESET_FORM,
        form: form,
    }
}

/* Select options. */

export function getOptionsListAsync(tableName, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.forms.GET_OPTIONS_LIST, RestService.getOptionsList.bind(null, tableName), args)
}

export function getConditionalOptionsListAsync(tableName, suffix, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey, suffix};
    return asyncAction(types.forms.GET_OPTIONS_LIST, RestService.getConditionalOptionsList.bind(null, tableName, suffix), args)
}

export function getSecondaryOptionsListAsync(tableName, id, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey, id};
    return asyncAction(types.forms.GET_SECONDARY_OPTIONS_LIST, RestService.getSecondaryOptionsList.bind(null, tableName, id), args)
}

/* Feedback */

export function resetFeedback(form) {
    return {
        type: types.forms.FORM_FEEDBACK_RESET,
        form: form,
    }
}

export function formSubmissionSuccess(form, msg) {
    return {
        type: types.forms.FORM_SUBMISSION_SUCCESS,
        form: form,
        msg: msg,
    };
}

export function formServerError(form, error, msg) {
    return {
        type: types.forms.FORM_SERVER_ERROR,
        form: form,
        error: error,
        msg: msg,
    };
}

export function formSubmissionError(form, error, msg) {
    return {
        type: types.forms.FORM_SUBMISSION_ERROR,
        form: form,
        error: error,
        msg: msg,
    };
}

