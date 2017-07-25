"use strict";
import actions from '../actionTypes';
import RestService from '../../../utils/RestService';
import { asyncAction, assertStoreKey } from './base';


/**
 * Query the table data for Query Runs, given a list of run IDs and a query type (sample material info, etc.)
 */
export function queryRunsAsync(runIds, queryType, storeKey) {
    let args = {runIds, storeKey};
    runIds = Object.keys(runIds).join(",");
    return asyncAction(actions.queryRuns.QUERY_RUNS, RestService.queryRuns.bind(null, runIds, queryType), args);
}

/**
 * Add or remove a run from selection.
 */
export function changeRunsSelection(runs) {
    return {
        type: actions.queryRuns.CHANGE_RUNS_SELECTION,
        runs: runs,  // a dict {runId: true}
    };
}

export function resetSelection() {
    return {
        type: actions.queryRuns.RESET_SELECTION,
    };
}

/**
 * Change the type of information that is displayed in the result table,
 * e.g. "samples_material", "user_request_info", etc. through the left menu.
 */
export function changeQueryType(queryType) {
    return {
        type: actions.queryRuns.CHANGE_QUERY_TYPE,
        queryType: queryType,
    };
}

/**
 * Filter the runs list by this term.
 */
export function search(term) {
    return {
        type: actions.queryRuns.SEARCH,
        term: term,
    };
}
