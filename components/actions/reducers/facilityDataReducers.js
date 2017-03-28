"use strict";
import types from '../actionTypes';
import returnList from './base';


const defaultState = {};



let facilityDataReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.facilityData.GET_TABLE_DATA:
            return returnList(action, state, action.args.storeKey, []);

        case types.facilityData.INSERT:
            return returnList(action, state, action.args.storeKey, []);

        /* Remove all cached table data when a field value changes in a form */
        case types.forms.CHANGE_FORM_VALUE:
            return defaultState;

        default:
            return state;
    }
};


export default facilityDataReducers;
