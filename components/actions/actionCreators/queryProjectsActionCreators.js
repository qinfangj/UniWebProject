"use strict";
import actions from '../actionTypes';
import RestService from '../../../utils/RestService';
import { asyncAction } from './base';


/**
 * Query the table data for Query Projects, given a list of sample IDs and a query type (sample material info, etc.)
 */
export function queryProjectsAsync(sampleIds, queryType) {
    let args = {sampleIds};
    sampleIds = sampleIds.join(",");
    return asyncAction(actions.queryProjects.QUERY_PROJECTS, RestService.queryProjects.bind(null, sampleIds, queryType), args);
}

/**
 * Clear the current projects/samples selection
 */
export function resetSelection() {
    return {
        type: actions.queryProjects.RESET_SELECTION,
    };
}

/**
 * Change the type of information that is displayed in the result table,
 * e.g. "samples_material", "user_request_info", etc. through the left menu.
 */
export function changeQueryType(queryType) {
    return {
        type: actions.queryProjects.CHANGE_QUERY_TYPE,
        queryType: queryType,
    };
}

/**
 * Query samples which name contains the given term, or which project/PI name contains the given term.
 */
export function search(term) {
    return {
        type: actions.queryProjects.SEARCH,
        term: term,
    };
}


/**
 * @deprecated (Now handled by RRF multiple inputs)
 * Add or remove a project from selection.
 */
export function changeProjectsSelection(projectIds) {
    return {
        type: actions.queryProjects.CHANGE_PROJECTS_SELECTION,
        projectIds: projectIds,
    };
}

/**
 * @deprecated (Now handled by RRF multiple inputs)
 * Add or remove a sample from selection.
 */
export function changeSamplesSelection(sampleIds) {
    return {
        type: actions.queryProjects.CHANGE_SAMPLES_SELECTION,
        sampleIds: sampleIds,
    };
}

