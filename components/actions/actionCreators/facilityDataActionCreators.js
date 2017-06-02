"use strict";
import types from '../actionTypes';
import RestService from '../../../utils/RestService';
import { asyncAction } from './base';



/* Facility data table */
export function getTableDataAsync(tableName, storeKey, activeOnly, limit, offset, orderBy, orderDir, filterBy) {
    let args = {tableName, storeKey, activeOnly, limit, offset, orderBy, orderDir, filterBy};
    return asyncAction(
        types.facilityData.GET_TABLE_DATA,
        RestService.specialSelect.bind(null, tableName, activeOnly, limit, offset, orderBy, orderDir, filterBy),
        args
    );
}


/* Inserts */
export function insertAsync(tableName, formData, storeKey) {
    let args = {tableName, storeKey};
    return asyncAction(types.facilityData.INSERT, RestService.insert.bind(null, tableName, formData), args);
}

/* Delete */
export function deleteAsync(tableName, id) {
    let args = {tableName,id};
    return asyncAction(types.facilityData.DELETE, RestService.delete.bind(null, tableName, id), args);
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
    return (dispatch) => {
        dispatch({
            type: types.forms.FILL_UPDATE_FORM,
            form: form,
            data: data,
        });
    }
}

/* Validate User*/
export function validateUserAsync(user) {
    let args = user;
    return asyncAction(types.facilityData.VALIDATE_USER, RestService.validateUser.bind(null, user), args);
}

export function requestLibrariesFromPool(projectId, pool) {
    let args = {};
    return asyncAction(types.facilityData.REQUEST_LIBRARIES_FROM_POOL, RestService.librariesFromPool.bind(null, projectId, pool), args);
}
