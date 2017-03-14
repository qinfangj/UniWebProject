"use strict";
import types from '../actionTypes';
import columns from '../../constants/columns';
import returnList from './base';


const defaultState = {
    queryProjectsType: columns.queryProjects.STARTING_MATERIAL_INFO,
};


let queryProjectsReducers = (state = defaultState, action) => {

    switch (action.type) {

        /**
         * Return an array of sample objects with added info, for display in the table.
         */
        case types.queryProjects.QUERY_PROJECTS:
            return returnList(action, state, action.args.storeKey, []);

        case types.queryProjects.CHANGE_QUERY_TYPE:
            return Object.assign(state, {queryProjectsType: action.queryType});

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
