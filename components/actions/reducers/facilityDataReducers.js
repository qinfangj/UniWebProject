"use strict";
import types from '../actionTypes';
import returnList from './base';
import constants from '../../constants/constants';
import tableNames from '../../tables/tableNames';



const defaultState = {};

for (let key of Object.keys(tableNames)) {
    let tname = tableNames[key];
    defaultState[tname] = {data: []};
}



let facilityDataReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.facilityData.GET_TABLE_DATA:
            let storeKey = action.args.storeKey;
            if (action.status === constants.PENDING) {
                return {...state, ...{[storeKey]: {data: []}, showLoading: true, error: null}};
            } else if (action.status === constants.ERROR) {
                return {...state, ...{[storeKey]: {data: []}, showLoading: false, error: action.response}};
            } else if (action.status === constants.SUCCESS) {

                let current = state[storeKey];
                let currentData = current.data;
                let newData = action.response;
                /* We want infinite scrolling, so
                    - reset the data if no offset is queried
                    - keep the previous data if we ask for more
                 */
                if (action.args.offset !== 0) {
                    newData = [...currentData, ...newData];
                }
                return {...state, ...{[storeKey]: {data: newData}, showLoading: false, error: null}};

            } else {
                return state;
            }

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
