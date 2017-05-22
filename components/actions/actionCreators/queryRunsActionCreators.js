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

export function changeRunsSelection(runs) {
    return {
        type: actions.queryRuns.CHANGE_RUNS_SELECTION,
        runs: runs,  // {runId: true}
    };
}

export function changeQueryType(queryType) {
    return {
        type: actions.queryRuns.CHANGE_QUERY_TYPE,
        queryType: queryType,
    };
}

export function resetSelection() {
    return {
        type: actions.queryRuns.RESET_SELECTION,
    };
}