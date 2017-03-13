"use strict";
import types from '../actionTypes';
import RestService from '../../../utils/RestService';
import { assertStoreKey, asyncAction } from './base';


/* Select options. */
export function getOptionsListAsync(tableName, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.facilityData.GET_OPTIONS_LIST, RestService.getOptionsList.bind(null, tableName), args)
}

export function getConditionalOptionsListAsync(tableName, suffix, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.facilityData.GET_OPTIONS_LIST, RestService.getConditionalOptionsList.bind(null, tableName, suffix), args)
}

export function getSecondaryOptionsListAsync(tableName, id, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.facilityData.GET_SECONDARY_OPTIONS_LIST, RestService.getSecondaryOptionsList.bind(null, tableName, id), args)
}



/* Facility data table */
export function getTableDataAsync(tableName, activeOnly, storeKey) {
    let args = {tableName, storeKey};
    return asyncAction(types.facilityData.GET_TABLE_DATA, RestService.specialSelect.bind(null, tableName, activeOnly), args);
}


/* Inserts */
export function insertAsync(tableName, formData, storeKey) {
    let args = {tableName, storeKey};
    return asyncAction(types.facilityData.INSERT, RestService.insert.bind(null, tableName, formData), args);
}


/* Fetch one item info (database row) */
export function findByIdAsync(tableName, id) {
    let args = {tableName, id};
    return asyncAction(types.facilityData.FIND_BY_ID, RestService.findById.bind(null, tableName, id), args)
}

/* Fetch one item to update the related form fields */
export function findForUpdateAsync(tableName, id, form) {
    return (dispatch) => {
        dispatch(findByIdAsync(tableName, id))
        .done((data) => {
            dispatch(fillUpdateForm(form, data))
        });
    }
}
/* Used only in findForUpdateAsync, dealt with in reducer "forms" */
export function fillUpdateForm(form, data) {
    return {
        type: types.forms.FILL_UPDATE_FORM,
        form: form,
        data: data,
    };
}

