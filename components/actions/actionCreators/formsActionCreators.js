"use strict";
import types from '../actionTypes';
import RestService from '../../../utils/RestService';
import { assertStoreKey, asyncAction } from './base';



export function changeFormValue(form, field, value, valid) {
    return {
        type: types.forms.CHANGE_FORM_VALUE,
        form: form,
        field: field,
        value: value,
        valid: valid,
    }
}

export function emptyForm(form) {
    return {
        type: types.forms.EMPTY_FORM,
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
    let args = {storeKey};
    return asyncAction(types.forms.GET_OPTIONS_LIST, RestService.getConditionalOptionsList.bind(null, tableName, suffix), args)
}

export function getSecondaryOptionsListAsync(tableName, id, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.forms.GET_SECONDARY_OPTIONS_LIST, RestService.getSecondaryOptionsList.bind(null, tableName, id), args)
}

