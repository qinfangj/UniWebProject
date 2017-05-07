"use strict";
import types from '../actionTypes';
import returnList from './base';
import optionsStoreKeys from '../../constants/optionsStoreKeys';


const defaultState = {};


function formatInstruments(v) { return [v.id, v.name]; }


let selectOptionsReducers = (state = defaultState, action) => {

    switch (action.type) {

        /* Select options list for dropdowns */

        case types.forms.GET_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        case types.forms.GET_SECONDARY_OPTIONS_LIST:
            return returnList(action, state, action.args.storeKey, []);

        case types.options.OPTIONS_INSTRUMENTS:
            return returnList(action, state, optionsStoreKeys.INSTRUMENTS, [], formatInstruments);

        default:
            return state;
    }

};


export default selectOptionsReducers;