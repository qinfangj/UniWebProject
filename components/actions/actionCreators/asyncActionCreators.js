
import actions from '../actionTypes';
import constants from '../../constants/constants';
import restService from '../api/restService';
import { sendError } from './commonActionCreators';

/**
 * @param type
 * @param status: constants.[SUCCESS|ERROR|PENDING]
 * @param response: http response.
 * @param args: an object of parameters to pass to the reducers.
 */
function syncAction(type, status, response, args) {
    return { type, status, response, args };
}
function asyncAction(type, action, args) {
    return dispatch => {
        dispatch(syncAction(type, constants.PENDING, null, args));
        return action(args)
            .done(response => {
                dispatch(syncAction(type, constants.SUCCESS, response, args));
            })
            .fail(error => {
                dispatch(syncAction(type, constants.ERROR, error, args))
            })
        ;
    }
}

/**
 * We don't have many tests, so better perform arg checks...
 */
function assertStoreKey(storeKey) {
    if (!storeKey) { throw "No store key was defined!"; }
}


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

/* Query projects */
export function queryProjectsAsync(ids, queryType, storeKey) {
    let args = {ids, storeKey};
    return asyncAction(actions.queryProjects.QUERY_PROJECTS, restService.queryProjects.bind(null, ids, queryType), args);
}
export function searchSamplesByTerm(term, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(actions.queryProjects.SEARCH_SAMPLES, restService.searchSamplesByTerm.bind(null, term), args);
}

