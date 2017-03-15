"use strict";
import types from '../actionTypes';
import returnList from './base';
import formStoreKeys from '../../constants/formStoreKeys';


const defaultState = {};


let queryProjectsReducers = (state = defaultState, action) => {

    switch (action.type) {

        /**
         * Return an array of sample objects with added info, for display in the table.
         */
        case types.queryProjects.QUERY_PROJECTS:
            return returnList(action, state, action.args.storeKey, []);

        case types.queryProjects.SEARCH_SAMPLES:
            // treated in formReducers
            return state;

        /**
         * Expects an object `action.projectIds` of the form {id: true} for each selected id.
         */
        case types.queryProjects.CHANGE_PROJECTS_SELECTION:
            return Object.assign(state, {projectIds: action.projectIds});

        /**
         * Expects an object `action.sampleIds` of the form {id: true} for each selected id.
         */
        case types.queryProjects.CHANGE_SAMPLES_SELECTION:
            return Object.assign(state, {sampleIds: action.sampleIds});

        case types.queryProjects.RESET_SELECTION:
            return Object.assign(state, {sampleIds: {}, projectsIds: {}});

        default:
            return state;
    }
};


export default queryProjectsReducers;
