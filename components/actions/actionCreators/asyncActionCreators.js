
import actions from '../actionTypes';
import restService from '../api/restService';
import { assertStoreKey, asyncAction } from './base';



/* Select options. */
export function getOptionsListAsync(tableName, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(actions.GET_OPTIONS_LIST, restService.getOptionsList.bind(null, tableName), args)
}
export function getConditionalOptionsListAsync(tableName, suffix, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(actions.GET_OPTIONS_LIST, restService.getConditionalOptionsList.bind(null, tableName, suffix), args)
}
export function getSecondaryOptionsListAsync(tableName, id, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(actions.GET_SECONDARY_OPTIONS_LIST, restService.getSecondaryOptionsList.bind(null, tableName, id), args)
}


/* Facility data table */
export function getTableDataAsync(tableName, activeOnly, storeKey) {
    let args = {tableName, storeKey};
    return asyncAction(actions.GET_TABLE_DATA, restService.specialSelect.bind(null, tableName, activeOnly), args);
}

/* Inserts */
export function insertAsync(tableName, formData, storeKey) {
    let args = {tableName, storeKey};
    return asyncAction(actions.INSERT, restService.insert.bind(null, tableName, formData), args);
}

/* Fetch one item info for update */
export function findByIdAsync(tableName, id) {
    let args = {tableName, id};
    return asyncAction(actions.FIND_BY_ID, restService.findById.bind(null, tableName, id), args);
}