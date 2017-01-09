import types from '../actionTypes';
import constants from '../../constants/constants';
import dataStoreKeys from '../../constants/dataStoreKeys';


const defaultState = {};


let asyncReducers = (state = defaultState, action) => {

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

    let storeKey;

    switch (action.type) {

        /* Select options list */

        case types.GET_OPTIONS_LIST:
            storeKey = action.args.storeKey;
            return returnList(storeKey);

        case types.GET_SECONDARY_OPTIONS_LIST:
            storeKey = action.args.storeKey;
            return returnList(storeKey);

        /* Table data */

        case types.GET_TABLE_DATA:
            storeKey = action.args.storeKey;
            return returnList(storeKey);

        /* Inserts */

        case types.INSERT:
            storeKey = action.args.storeKey;
            return returnList(storeKey);

        /* Query Projects */

        case types.queryProjects.QUERY_PROJECTS:
            storeKey = action.args.storeKey;
            return returnList(storeKey);

        case types.queryProjects.SEARCH_SAMPLES:
            /*
                The search returns all samples containing the term,
                but what we want is options from both projects and samples lists,
                where the project either contains the term or has a sample containing it,
                and where the sample either contains the term of its project contains it.
            */
            storeKey = action.args.storeKey;
            let term = action.args.term;
            let newState = Object.assign({}, state);
            if (action.status === constants.SUCCESS) {
                let searchedSamples = action.response;
                if (term === "") {
                    newState[storeKey] = { projectIds: null, sampleIds: null };
                } else {
                    let projects = state[dataStoreKeys.PROJECTS_WITH_SAMPLE] || [];
                    let samples = state[dataStoreKeys.SAMPLES_FOR_PROJECTS] || [];
                    // IE can't do that, but who needs IE anyway?
                    let sampleIdsWithTerm = new Set(searchedSamples.map(v => v.id));
                    let projectIdsWithTerm = new Set(projects.filter(v => {
                        return v.name.toLowerCase().indexOf(term) >= 0
                            || v.last_name.toLowerCase().indexOf(term) >= 0;
                    }).map(v => v.id));
                    let sampleIdsWithProject = new Set(samples.filter(v => projectIdsWithTerm.has(v.project_id)).map(v => v.id));
                    let projectIdsWithSample = new Set(searchedSamples.map(v => v.project_id));
                    // Union, the JS way.
                    let projectIds = new Set([...projectIdsWithTerm, ...projectIdsWithSample]);
                    let sampleIds = new Set([...sampleIdsWithTerm, ...sampleIdsWithProject]);
                    newState[storeKey] = { projectIds, sampleIds };
                }
            } else {
                newState[storeKey] = { projectIds: null, sampleIds: null };
            }
            return newState;

        default:
            return state;
    }
};


export default asyncReducers;
