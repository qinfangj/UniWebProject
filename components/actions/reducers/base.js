"use strict";
import constants from '../../constants/constants';


/**
 * All kinds of special backend async GET responses are handled the same way.
 * @param storeKey: key name in the store.
 * showme: indicate
 */
export default function returnList(action, state, storeKey, pendingValue) {
    if (action.status === constants.PENDING) {
        return {...state, ...{[storeKey]: pendingValue, isLoading: true}};
    } else if (action.status === constants.SUCCESS) {
        return {...state, ...{[storeKey]: action.response, isLoading: false}};
    } else if (action.status === constants.ERROR) {
        return {...state, ...{[storeKey]: pendingValue, isLoading: false, error: action.response}};
    } else {
        return state;
    }
}

