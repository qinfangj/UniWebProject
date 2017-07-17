"use strict";
import types from '../actionTypes';
import returnList from './base';
import constants from '../../constants/constants';
import tableNames from '../../constants/tableNames';



const defaultState = {};


let userDataReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.userData.BATCH_INSERT:
            return returnList(action, state, null, []);

        /* Get UserDataRuns  */
        case types.USERDATARUNS:
            return returnList(action, state, action.args.storeKey, []);

        default:
            return state;
    }

};


export default userDataReducers;
