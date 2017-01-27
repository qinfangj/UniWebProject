
import actionTypes from '../actionTypes';
import restService from '../api/restService';
import { assertStoreKey, asyncAction } from './base';
let types = actionTypes.facilityData;


/* Select options. */
export function getOptionsListAsync(tableName, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.GET_OPTIONS_LIST, restService.getOptionsList.bind(null, tableName), args)
}
export function getConditionalOptionsListAsync(tableName, suffix, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.GET_OPTIONS_LIST, restService.getConditionalOptionsList.bind(null, tableName, suffix), args)
}
export function getSecondaryOptionsListAsync(tableName, id, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.GET_SECONDARY_OPTIONS_LIST, restService.getSecondaryOptionsList.bind(null, tableName, id), args)
}


/* Facility data table */
export function getTableDataAsync(tableName, activeOnly, storeKey) {
    let args = {tableName, storeKey};
    return asyncAction(types.GET_TABLE_DATA, restService.specialSelect.bind(null, tableName, activeOnly), args);
}

/* Inserts */
export function insertAsync(tableName, formData, storeKey) {
    let args = {tableName, storeKey};
    return asyncAction(types.INSERT, restService.insert.bind(null, tableName, formData), args);
}

/* Fetch one item info (database row) */
export function findByIdAsync(tableName, id) {
    let args = {tableName, id};
    return asyncAction(types.FIND_BY_ID, restService.findById.bind(null, tableName, id), args)
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
export function fillUpdateForm(form, data) {
    return {
        type: types.FILL_UPDATE_FORM,
        form: form,
        data: data,
    };
}
