import actions from '../actionTypes';
import restService from '../api/restService';
import { asyncAction, assertStoreKey } from './base';


/**
 * Query the table data for Query Projects, given a list of sample IDs and a query type (sample material info, etc.)
 */
export function queryProjectsAsync(sampleIds, queryType, storeKey) {
    let args = {sampleIds, storeKey};
    return asyncAction(actions.queryProjects.QUERY_PROJECTS, restService.queryProjects.bind(null, sampleIds, queryType), args);
}

/**
 * Query samples which name contains the given term, or which project/PI name contains the given term.
 */
export function searchSamplesByTerm(term, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey, term};
    return asyncAction(actions.queryProjects.SEARCH_SAMPLES, restService.searchSamplesByTerm.bind(null, term), args);
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
export function resetSelection() {
    return {
        type: actions.queryProjects.RESET_SELECTION,
    };
}