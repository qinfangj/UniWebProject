"use strict";
import types from '../actionTypes';
import returnList from './base';
import columns from '../../constants/columns';


const defaultState = {
    tableData: [],
    selectedRuns: {},
    queryType: "",
    searchTerm: "",
};


let queryRunsReducers = (state = defaultState, action) => {

    switch (action.type) {

        /**
         * Expects `action.queryType` - a string.
         */
        case types.queryRuns.CHANGE_QUERY_TYPE:
            return {...state, queryType: action.queryType};

        /**
         * Expects `action.runs`, an object {runId: true} .
         */
        case types.queryRuns.CHANGE_RUNS_SELECTION:
            return {...state, selectedRuns: {...action.runs}};

        /**
         * Return an array of sample objects with added info, for display in the table.
         */
        case types.queryRuns.QUERY_RUNS:
            return returnList(action, state, "tableData", []);

        case types.queryRuns.RESET_SELECTION:
            return {...state, tableData: [], selectedRuns: {}, searchTerm: ""};

        case types.queryRuns.SEARCH:
            return {...state, searchTerm: action.term};

        default:
            return state;
    }
};


export default queryRunsReducers;
