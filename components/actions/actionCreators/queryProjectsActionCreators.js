"use strict";
import actions from '../actionTypes';
import RestService from '../../../utils/RestService';
import { asyncAction, assertStoreKey } from './base';


/**
 * Query the table data for Query Projects, given a list of sample IDs and a query type (sample material info, etc.)
 */
export function queryProjectsAsync(sampleIds, queryType, storeKey) {
    let args = {sampleIds, storeKey};
    return asyncAction(actions.queryProjects.QUERY_PROJECTS, RestService.queryProjects.bind(null, sampleIds, queryType), args);
}

/**
 * Query samples which name contains the given term, or which project/PI name contains the given term.
 */
export function searchSamplesByTerm(term, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey, term};
    return asyncAction(actions.queryProjects.SEARCH_SAMPLES, RestService.searchSamplesByTerm.bind(null, term), args);
}

/**
 * Change the query type (cf. constants.columns.queryProjects)
 * @param queryType
 */
export function changeQueryProjectsType(queryType) {
    return {
        type: actions.queryProjects.CHANGE_QUERY_TYPE,
        queryType: queryType,
    };
}

/**
 * Clear the current projects/samples selection
 * **Special**: this is listened to by commonReducers, because it acts on form values.
 * The multiple selects should have their own special action, but for now I don't know
 * if these components (multiple selects) will be reused and where.
 */
export function resetSelection(form, field) {
    return {
        type: actions.queryProjects.RESET_SELECTION,
        form: form,
        field: field,
    };
}