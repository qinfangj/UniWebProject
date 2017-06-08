"use strict";
import types from '../actionTypes';
import returnList from './base';
import constants from '../../constants/constants';
import tableNames from '../../tables/tableNames';



const defaultState = {};


let userDataReducers = (state = defaultState, action) => {

    switch (action.type) {

        case types.userData.BATCH_INSERT:
            return returnList(action, state, null, []);

        default:
            return state;
    }

};


export default userDataReducers;
