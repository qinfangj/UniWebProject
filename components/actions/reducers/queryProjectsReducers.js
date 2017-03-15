"use strict";
import types from '../actionTypes';
import returnList from './base';
import dataStoreKeys from '../../constants/dataStoreKeys';
import constants from '../../constants/constants';


const defaultState = {};


let queryProjectsReducers = (state = defaultState, action) => {

    switch (action.type) {

        /**
         * Return an array of sample objects with added info, for display in the table.
         */
        case types.queryProjects.QUERY_PROJECTS:
            return returnList(action, state, action.args.storeKey, []);

        /**
         * Expects an object `action.projectIds` of the form {id: true} for each selected id.
         */
        case types.queryProjects.CHANGE_PROJECTS_SELECTION:
            // Also reset samples selection if projects selection changes
            return Object.assign(state, {projectIds: action.projectIds, sampleIds: {}});

        /**
         * Expects an object `action.sampleIds` of the form {id: true} for each selected id.
         */
        case types.queryProjects.CHANGE_SAMPLES_SELECTION:
            return Object.assign(state, {sampleIds: action.sampleIds});

        case types.queryProjects.RESET_SELECTION:
            return Object.assign(state, {sampleIds: {}, projectsIds: {}});

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
                // The list of samples we get from backend:: [{id, name, projectId, shortName}, ...]
                let searchedSamples = action.response;
                    //console.debug(searchedSamples)
                    //console.debug(state[dataStoreKeys.PROJECTS_HAVING_A_SAMPLE])
                // The options lists in both dropdowns:: [{id, name, lastName}, ...]
                let projects = state[dataStoreKeys.PROJECTS_HAVING_A_SAMPLE] || [];  // options from the 'multiple' projects selection field
                let samples = state[dataStoreKeys.SAMPLES_FOR_PROJECTS] || [];  // options from the 'multiple' samples selection field
                // IE can't do that - Sets -, but who needs IE anyway?
                let sampleIdsWithTerm = new Set(searchedSamples.map(v => v.id));
                let projectIdsWithTerm = new Set(projects.filter(v => {
                    return v.name.toLowerCase().indexOf(term) >= 0
                        || v.lastName.toLowerCase().indexOf(term) >= 0;
                }).map(v => v.id));
                let sampleIdsWithProject = new Set(samples.filter(v => projectIdsWithTerm.has(v.projectId)).map(v => v.id));
                let projectIdsWithSample = new Set(searchedSamples.map(v => v.projectId));
                    //console.debug([...projectIdsWithTerm])
                    //console.debug([...projectIdsWithSample])
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
