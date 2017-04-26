"use strict";
import types from '../actionTypes';
import returnList from './base';


const defaultState = {};



let selectOptionsReducers = (state = defaultState, action) => {

    switch (action.type) {

        /* Select options list for dropdowns */

        case types.forms.GET_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        case types.forms.GET_SECONDARY_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        default:
            return state;
    }

};


export default selectOptionsReducers;