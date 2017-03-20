"use strict";
import constants from '../../constants/constants';


/**
 * All kinds of special backend async GET responses are handled the same way.
 * @param storeKey: key name in the store.
 */
export default function returnList(action, state, storeKey, pendingValue) {
    if (action.status === constants.PENDING) {
        return Object.assign({}, state, {[storeKey]: pendingValue});
    } else if (action.status === constants.SUCCESS) {
        return Object.assign({}, state, {[storeKey]: action.response});
    } else if (action.status === constants.ERROR) {
        return Object.assign({}, state, {[storeKey]: action.response});
    } else {
        return state;
    }
}

