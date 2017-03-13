"use strict";
import types from '../actionTypes';
import returnList from './base';


const defaultState = {};



let facilityDataReducers = (state = defaultState, action) => {

    switch (action.type) {

        /* Table data */

        case types.facilityData.GET_TABLE_DATA:
            return returnList(action, state, action.args.storeKey, []);

        /* Inserts */

        case types.facilityData.INSERT:
            return returnList(action, state, action.args.storeKey, []);

        default:
            return state;
    }
};


export default facilityDataReducers;
