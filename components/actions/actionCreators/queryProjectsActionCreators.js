import actions from '../actionTypes';
import restService from '../api/restService';
import { asyncAction, assertStoreKey } from './baseActionCreators';


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
