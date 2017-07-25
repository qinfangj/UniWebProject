"use strict";
import types from '../actionTypes';
import returnList from './base';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import constants from '../../constants/constants';
import columns from '../../constants/columns';


const defaultState = {
    tableData: [],
    queryType: columns.queryProjects.STARTING_MATERIAL_INFO,
    projectsAndSamplesSearchedByTerm: [],
    selectedSamples: {},
    selectedProjects: {},
    searchTerm: "",
};


let queryProjectsReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.queryProjects.CHANGE_QUERY_TYPE:
            return {...state, queryType: action.queryType};

        /**
         * Return an array of sample objects with added info, for display in the table.
         */
        case types.queryProjects.QUERY_PROJECTS:
            return returnList(action, state, "tableData", []);

        /**
         * Expects an object `action.projectIds` of the form {id: true} for each selected id.
         */
        case types.queryProjects.CHANGE_PROJECTS_SELECTION:
            // Also reset samples selection if projects selection changes
            return Object.assign({}, state, {selectedProjects: action.projectIds, selectedSamples: {}});

        /**
         * Expects an object `action.sampleIds` of the form {id: true} for each selected id.
         */
        case types.queryProjects.CHANGE_SAMPLES_SELECTION:
            return Object.assign({}, state, {selectedSamples: action.sampleIds});

        case types.queryProjects.RESET_SELECTION:
            return Object.assign({}, state,
                {
                    [optionsStoreKeys.SAMPLES_FOR_PROJECTS]: [],
                    sampleIds: {}, projectsIds: {}, searchTerm: "",
                    tableData: []
                }
            );

        /**
         * Since these two options lists are stored in the forms reducer, cannot access
         * to that part of the store tree from here. So we store it twice, instead of
         * maybe better but super complicated solutions like this:
         * http://redux.js.org/docs/recipes/ComputingDerivedData.html
         * https://github.com/reactjs/redux/issues/749
         */
        case types.forms.GET_OPTIONS_LIST:
        case types.forms.GET_SECONDARY_OPTIONS_LIST:
            if (action.args.storeKey === optionsStoreKeys.PROJECTS_HAVING_A_SAMPLE ||
                action.args.storeKey === optionsStoreKeys.SAMPLES_FOR_PROJECTS) {
                return returnList(action, state, action.args.storeKey, []);
            } else {
                return state;
            }

        case types.queryProjects.SEARCH:
            return {...state, searchTerm: action.term};

        // /**
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
