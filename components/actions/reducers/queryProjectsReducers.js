"use strict";
import types from '../actionTypes';
import constants from '../../constants/constants';
import columns from '../../constants/columns'
import dataStoreKeys from '../../constants/dataStoreKeys';


const defaultState = {
    queryProjectsType: columns.queryProjects.STARTING_MATERIAL_INFO,
};


let queryProjectsReducers = (state = defaultState, action) => {

    /**
     * All kinds of special backend async GET responses are handled the same way.
     * @param storeKey: key name in the store.
     */
    function returnList(storeKey) {
        if (action.status === constants.PENDING) {
            return Object.assign(state, {[storeKey]: []});
        } else if (action.status === constants.SUCCESS) {
            return Object.assign(state, {[storeKey]: action.response});
        } else if (action.status === constants.ERROR) {
            return Object.assign(state, {[storeKey]: action.error});
        } else {
            return state;
        }
    }


    switch (action.type) {

        /**
         * Return an array of sample objects with added info, for display in the table.
         */
        case types.queryProjects.QUERY_PROJECTS:
            return returnList(action.args.storeKey);

        case types.queryProjects.CHANGE_QUERY_TYPE:
            return Object.assign(state, {queryProjectsType: action.queryType});

        case types.queryProjects.RESET_SELECTION:
            // treated in commonReducers.
            return state;

        /**
         * Search for samples having a given term in their name.
         * The search returns all samples containing the term,
         * but what we want is options from both projects and samples lists,
         * where the project either contains the term or has a sample containing it,
         * and where the sample either contains the term of its project contains it.
         * Return the corresponding IDs arrays for both projects and samples.
         * Still need to intersect with what is displayed without the search (
         * e.g. only the ones for the selected projects).
         */
        case types.queryProjects.SEARCH_SAMPLES:
            let storeKey = action.args.storeKey;
            let term = action.args.term;
            let newState = Object.assign({}, state);
            if (action.status === constants.SUCCESS) {
                let searchedSamples = action.response;
                let projects = state[dataStoreKeys.PROJECTS_WITH_SAMPLE] || [];
                let samples = state[dataStoreKeys.SAMPLES_FOR_PROJECTS] || [];
                // IE can't do that, but who needs IE anyway?
                let sampleIdsWithTerm = new Set(searchedSamples.map(v => v.id));
                let projectIdsWithTerm = new Set(projects.filter(v => {
                    return v.name.toLowerCase().indexOf(term) >= 0
                        || v.lastName.toLowerCase().indexOf(term) >= 0;
                }).map(v => v.id));
                let sampleIdsWithProject = new Set(samples.filter(v => projectIdsWithTerm.has(v.projectId)).map(v => v.id));
                let projectIdsWithSample = new Set(searchedSamples.map(v => v.projectId));
                // Union, the JS way.
                let projectIds = new Set([...projectIdsWithTerm, ...projectIdsWithSample]);
                let sampleIds = new Set([...sampleIdsWithTerm, ...sampleIdsWithProject]);
                newState[storeKey] = { projectIds, sampleIds };
            }
            return newState;

        default:
            return state;
    }
};


export default queryProjectsReducers;
