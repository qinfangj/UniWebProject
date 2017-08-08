"use strict";
import types from '../actionTypes';
import returnList from './base';
import columns from '../../constants/columns';


const defaultState = {
    tableData: [],
    queryType: "",
    projectsAndSamplesSearchedByTerm: [],
    selectedSamples: [],  // here an array because of multiple selects
    selectedProjects: [], // same
    searchTerm: "",
};


let queryProjectsReducers = (state = defaultState, action) => {

    let newState;

    switch (action.type) {

        /**
         * Expects `action.queryType` - a string.
         */
        case types.queryProjects.CHANGE_QUERY_TYPE:
            return {...state, queryType: action.queryType};

        /**
         * Return an array of sample objects with added info, for display in the table.
         */
        case types.queryProjects.QUERY_PROJECTS:
            newState = {...state, selectedSamples: action.args.sampleIds};
            return returnList(action, newState, "tableData", []);

        /**
         * Reset selections, table data, search term.
         */
        case types.queryProjects.RESET_SELECTION:
            return Object.assign({}, state,
                {
                    tableData: [],
                    projectsAndSamplesSearchedByTerm: [],
                    selectedSamples: {},
                    selectedProjects: {},
                    searchTerm: "",
                }
            );

        /**
         * Filter projects and samples by the given term.
         */
        case types.queryProjects.SEARCH:
            return {...state, searchTerm: action.term};

        /**
         * @deprecated (handled by RRF multiple select)
         * Change the selection of projects.
         * Also reset samples selection if projects selection changes.
         * Expects an object `action.projectIds` of the form {id: true} for each selected id.
         */
        case types.queryProjects.CHANGE_PROJECTS_SELECTION:
            return Object.assign({}, state, {selectedProjects: action.projectIds, selectedSamples: {}});

        /**
         * @deprecated (handled by RRF multiple select)
         * Change the selection of samples.
         * Expects an object `action.sampleIds` of the form {id: true} for each selected id.
         */
        case types.queryProjects.CHANGE_SAMPLES_SELECTION:
            return Object.assign({}, state, {selectedSamples: action.sampleIds});


        // /**
        //  * @deprecated (old tedious version of the search. Lazy = better, but hard to maintain)
        //  * Search for samples having a given term in their name.
        //  * The search returns all samples containing the term,
        //  * but what we want is options from both projects and samples lists,
        //  * where the project either contains the term or has a sample containing it,
        //  * and where the sample either contains the term of its project contains it.
        //  * Return the corresponding IDs arrays for both projects and samples.
        //  * Still need to intersect with what is displayed without the search (
        //  * e.g. only the ones for the selected projects).
        //  */
        // case types.queryProjects.SEARCH_SAMPLES:
        //     let term = action.args.term;
        //     let newState = Object.assign({}, state, {searchTerm: action.args.term});
        //     if (action.status === constants.SUCCESS) {
        //         // The list of samples we get from backend:: [{id, name, projectId, shortName}, ...]
        //         let searchedSamples = action.response;
        //             //console.debug(searchedSamples)
        //             //console.debug(state[optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE])
        //         // The options lists in both dropdowns:: [{id, name, lastName}, ...]
        //         let projects = state[optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE];  // options from the 'multiple' projects selection field
        //         let samples = state[optionsStoreKeys.SAMPLES_FOR_PROJECTS];  // options from the 'multiple' samples selection field
        //         // IE can't do that - Sets -, but who needs IE anyway?
        //         let sampleIdsWithTerm = new Set(searchedSamples.map(v => v.id));
        //         let projectIdsWithTerm = new Set(projects.filter(v => {
        //             return v.name.toLowerCase().indexOf(term) >= 0
        //                 || v.lastName.toLowerCase().indexOf(term) >= 0;
        //         }).map(v => v.id));
        //         let sampleIdsWithProject = new Set(samples.filter(v => projectIdsWithTerm.has(v.projectId)).map(v => v.id));
        //         let projectIdsWithSample = new Set(searchedSamples.map(v => v.projectId));
        //             //console.debug([...projectIdsWithTerm])
        //             //console.debug([...projectIdsWithSample])
        //         // Union, the JS way.
        //         let projectIds = new Set([...projectIdsWithTerm, ...projectIdsWithSample]);
        //         let sampleIds = new Set([...sampleIdsWithTerm, ...sampleIdsWithProject]);
        //         newState.projectsAndSamplesSearchedByTerm = { projectIds, sampleIds };
        //     }
        //     return newState;

        default:
            return state;
    }
};


export default queryProjectsReducers;
