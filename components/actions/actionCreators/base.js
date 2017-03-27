"use strict";
import constants from '../../constants/constants';

/**
 * We don't have many tests, so better perform arg checks...
 */
export function assertStoreKey(storeKey) {
    if (!storeKey) { throw "No store key was defined!"; }
}

/**
 * @param type
 * @param status: constants.[SUCCESS|ERROR|PENDING]
 * @param response: http response.
 * @param args: an object of parameters to pass to the reducers.
 */
export function syncAction(type, status, response, args) {
    return { type, status, response, args };
}

export function asyncAction(type, action, args) {
    return dispatch => {
        dispatch(syncAction(type, constants.PENDING, null, args));

            return action(args)
                .done(response => {
                    dispatch(syncAction(type, constants.SUCCESS, response, args));
                })
                .fail(error => {
                    dispatch(syncAction(type, constants.ERROR, error, args));
                    //dispatch(sendError(error, "asyncAction"));
                });


    }
}