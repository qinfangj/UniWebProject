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
 * Query the table data for Query Projects, given a list of sample IDs and a query type (sample material info, etc.)
 */
export function queryRunsAsync(runIds, queryType, storeKey) {
    let args = {runIds, storeKey};
    return asyncAction(actions.queryProjects.QUERY_RUNS, RestService.queryRuns.bind(null, runIds, queryType), args);
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
 * Like formsActionCreators.changeFormValue but only for QP projects selection.
 */
export function changeProjectsSelection(projectIds) {
    return {
        type: actions.queryProjects.CHANGE_PROJECTS_SELECTION,
        projectIds: projectIds,
    };
}

/**
 * Like formsActionCreators.changeFormValue but only for QP projects selection.
 */
export function changeSamplesSelection(sampleIds) {
    return {
        type: actions.queryProjects.CHANGE_SAMPLES_SELECTION,
        sampleIds: sampleIds,
    };
}

/**
 * Clear the current projects/samples selection
 */
export function resetSelection() {
    return {
        type: actions.queryProjects.RESET_SELECTION,
    };
}