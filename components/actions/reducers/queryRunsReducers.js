"use strict";
import types from '../actionTypes';
import returnList from './base';
import optionsStoreKeys from '../../constants/optionsStoreKeys';
import queryProjectsStoreKeys from '../../constants/queryProjectsStoreKeys';
import constants from '../../constants/constants';
import columns from '../../constants/columns';


const defaultState = {
    tableData: [],
    selectedRuns: {},
    queryType: columns.queryProjects.STARTING_MATERIAL_INFO,
    [queryProjectsStoreKeys.QP_RUNS_TABLE_DATA]: [],
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
            return {...state, selectedRuns: action.runs};

        /**
         * Return an array of sample objects with added info, for display in the table.
         */
        case types.queryRuns.QUERY_RUNS:
            return returnList(action, state, queryProjectsStoreKeys.QP_RUNS_TABLE_DATA, []);

        case types.queryRuns.RESET_SELECTION:
            return defaultState;

        default:
            return state;
    }
};


export default queryRunsReducers;
