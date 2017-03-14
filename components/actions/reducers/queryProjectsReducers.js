"use strict";
import types from '../actionTypes';
import returnList from './base';


const defaultState = {};


let queryProjectsReducers = (state = defaultState, action) => {

    switch (action.type) {

        /**
         * Return an array of sample objects with added info, for display in the table.
         */
        case types.queryProjects.QUERY_PROJECTS:
            return returnList(action, state, action.args.storeKey, []);

        case types.queryProjects.RESET_SELECTION:
            // treated in formReducers
            return state;

        case types.queryProjects.SEARCH_SAMPLES:
            // treated in formReducers
            return state;

        default:
            return state;
    }
};


export default queryProjectsReducers;
