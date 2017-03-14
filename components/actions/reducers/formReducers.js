"use strict";
import types from '../actionTypes';
import formStoreKeys from '../../constants/formStoreKeys';
import returnList from './base';
import dataStoreKeys from '../../constants/dataStoreKeys';
import constants from '../../constants/constants';


const defaultState = {
};



let formReducers = (state = defaultState, action) => {

    let newState;
    let form;

    switch (action.type) {

        /* Select options list */

        case types.forms.GET_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        case types.forms.GET_SECONDARY_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        /**
         * Reset form data. Expects `action.form` (form name).
         */
        case types.forms.EMPTY_FORM:
            newState = Object.assign({}, state);
            newState[action.form] = {};
            newState[action.form]._isValid = {};
            return newState;

        case types.forms.CHANGE_FORM_VALUE:
            newState = Object.assign({}, state);
            form = action.form;
            let field = action.field;
            // Create if not exists
            if (! (form in state)) {
                newState[form] = {};
            }
            //console.debug(field, action.valid, action.value)
            newState[form][field] = action.value;
            newState[form]._isValid[field] = action.valid;

            /* Special cases */

            // QP: Reset samples selection if projects selection changes
            if (form === formStoreKeys.QUERY_PROJECTS_FORM
                && field === form + formStoreKeys.suffixes.PROJECTS) {
              newState[form][form + formStoreKeys.suffixes.SAMPLES] = {};
            }

            return newState;

        /**
         * Takes the data for a database row that we queried by ID to fill the related form for update.
         * Expects `action.form` (form name), `action.data` (row data).
         */
        case types.forms.FILL_UPDATE_FORM:
            newState = Object.assign({}, state);
            form = action.form;
            let formData = state[form] || {};  // current state
            Object.assign(formData, action.data);  // updated state
            console.debug(formData)
            newState[form] = formData;
            newState[form]._isValid = {};
            // Above we supposed that the keys returned by the backend (Slick auto-generated models)
            // correspond to what is defined in ./fields.js. Otherwise, add exceptions here.
            return newState;

        /**
         * Specific to queryProjects, but acts on centralized form values, so we treat it here as well.
         */
        case types.queryProjects.RESET_SELECTION:
            newState = Object.assign({}, state);
            let qpForm = formStoreKeys.QUERY_PROJECTS_FORM;
            let samplesKey = qpForm + formStoreKeys.suffixes.SAMPLES;
            let projectsKey = qpForm + formStoreKeys.suffixes.PROJECTS;
            if (newState[qpForm] !== undefined) {
                newState[qpForm][samplesKey] = {};
                newState[qpForm][projectsKey] = {};
            }
            newState[action.form][action.field] = -1;
            return newState;

        /**
         * Specific to queryProjects, but acts on centralized form values, so we treat it here as well.
         *
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
                let projects = state[dataStoreKeys.PROJECTS_HAVING_A_SAMPLE] || [];
                let samples = state[dataStoreKeys.SAMPLES_FOR_PROJECTS] || [];
                // IE can't do that, but who needs IE anyway?
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


export default formReducers;
