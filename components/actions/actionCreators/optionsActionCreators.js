"use strict";
import types from '../actionTypes';
import RestService from '../../../utils/RestService';
import { assertStoreKey, asyncAction } from './base';
import optionsStoreKeys from '../../constants/optionsStoreKeys';


/* Select options. */

export function getOptionsListAsync(tableName, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey};
    return asyncAction(types.forms.GET_OPTIONS_LIST, RestService.getOptionsList.bind(null, tableName), args)
}

export function getConditionalOptionsListAsync(tableName, suffix, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey, suffix};
    return asyncAction(types.forms.GET_OPTIONS_LIST, RestService.getConditionalOptionsList.bind(null, tableName, suffix), args)
}

export function getSecondaryOptionsListAsync(tableName, id, storeKey) {
    assertStoreKey(storeKey);
    let args = {storeKey, id};
    return asyncAction(types.forms.GET_SECONDARY_OPTIONS_LIST, RestService.getSecondaryOptionsList.bind(null, tableName, id), args)
}

//---------------------------------------------------

function requestOptionsListAsync(actionType, tableName, suffix) {
    if (suffix) {
        return asyncAction(actionType, RestService.getConditionalOptionsList.bind(null, tableName, suffix), {});
    } else {
        return asyncAction(actionType, RestService.getOptionsList.bind(null, tableName), {});
    }
}

export default function requestOptions(storeKey, suffix) {
    switch(storeKey) {
        case optionsStoreKeys.INSTRUMENTS:
            return requestOptionsListAsync(types.options.OPTIONS_INSTRUMENTS, "instruments");

        default:
            break;
    }
}