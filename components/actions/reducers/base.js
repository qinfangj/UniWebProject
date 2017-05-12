"use strict";
import constants from '../../constants/constants';


/**
 * All kinds of special backend async GET responses are handled the same way.
 * @param storeKey: key name in the store.
 * @param pendingValue: the value returned when data is loading or loading has failed.
 * @param responseFormatter: a function that is applied to every element of the response array.
 */
export default function returnList(action, state, storeKey, pendingValue, responseFormatter) {
    const status = action.status;
    const response = action.response;
    if (status === constants.PENDING) {
        return {...state, ...{[storeKey]: pendingValue, isLoading: true}};
    } else if (status === constants.SUCCESS) {
        let formattedResponse = responseFormatter ? response.map(v => responseFormatter(v)) : response;
        return {...state, ...{[storeKey]: formattedResponse, isLoading: false}};
    } else if (status === constants.ERROR) {
        return {...state, ...{[storeKey]: pendingValue, isLoading: false, error: response}};
    } else {
        return state;
    }
}

